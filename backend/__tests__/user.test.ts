import supertest from "supertest";
import { app, server } from "../index";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe("User Routes", () => {
  let adminToken: string;
  let userToken: string;
  let newUser: number;
  let newUserEmail: string;

  beforeAll(() => {
    const jwtKey = process.env.JWT_SECRET || "default_secret_key";
    adminToken = jwt.sign(
      { userId: "admin-id", email: "admin@gmail.com", role: "Admin" },
      jwtKey,
      { expiresIn: "1h" }
    );
    userToken = jwt.sign(
      { userId: "user-id", email: "user@gmail.com", role: "user" },
      jwtKey,
      { expiresIn: "1h" }
    );
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("POST /signup", () => {
    it("should create a new user and return 201", async () => {
      const response = await request.post("/api/signup").send({
        email: "abcdef@example.com",
        password: "Password123!",
        role: "Admin",
        name: "User",
      });
      newUser = response.body.user.id;
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Signup Successful!"
      );
      expect(response.body).toHaveProperty("user");
    });

    it("should return 400 if validation fails", async () => {
      const response = await request.post("/api/signup").send({
        email: "invalidemail",
        password: "short",
        confirmPassword: "short",
      });
      expect(response.status).toBe(400);
    //   expect(response.body).toHaveProperty("errors");
    });
  });

  describe("POST /login", () => {
    it("should login user and return 200 with a token", async () => {
      const response = await request.post("/api/login").send({
        email: "newuser@example.com",
        password: "Password123!",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
    });

    it("should return 401 if validation fails", async () => {
      const response = await request.post("/api/login").send({
        email: "user@gmail.com",
        password: "abcd12",
      });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("GET /employees", () => {
    it("should return a list of users for admin", async () => {
      const response = await request
        .get("/api/employees")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("users");
      expect(response.body.users).toBeInstanceOf(Array);
    });

    it("should return 403 for non-admin", async () => {
      const response = await request
        .get("/api/employees")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toBe(403);
    });
  });

  describe("GET /user/:userId", () => {
    it("should return a user for authenticated user", async () => {
      const response = await request
        .get("/api/user/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
    });

    it("should return 500 if user is not found", async () => {
      const response = await request
        .get("/api/user/invalid-id")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toBe(500);
    });
  });

  describe("PUT /user/:userId", () => {
    newUserEmail = "updateduser@example.com";
    it("should update a user email and return 200", async () => {
      const response = await request
        .put(`/api/user/${newUser}`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          email: "updateduser@example.com",
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Email updated successfully"
      );
      expect(response.body).toHaveProperty(
        "user"
      );
    });

    it('should return 400 if validation fails', async () => {
        const response = await request.put('/api/user/user-id')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                email: 'invalidemail', 
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('message', 'Invalid email');
    });
  });

  describe("DELETE /user/:id", () => {
    it('should delete a user and return 200 for admin', async () => {
        const response = await request.delete(`/api/user/${newUser}`)
            .set('Authorization', `Bearer ${adminToken}`);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user'); 
        expect(response.body.user).toHaveProperty('id', newUser); 
        expect(response.body.user).toHaveProperty('email', newUserEmail);
        expect(response.body.user).toHaveProperty('name', 'User');
    });
    

    it("should return 403 for non-admin", async () => {
      const response = await request
        .delete("/api/user/1")
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toBe(403);
    });

    it("should return 404 if user is not found", async () => {
      const response = await request
        .delete("/api/user/invalid-id")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(response.status).toBe(500);
    });
  });
});
