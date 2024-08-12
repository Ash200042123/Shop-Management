import supertest from "supertest";
import { app, server } from "../index";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe("Product Routes", () => {
  let token: string;
  let adminToken: string;
  let productName: string;

  beforeAll(() => {
    const jwtKey = process.env.JWT_SECRET || "default_secret_key";
    token = jwt.sign(
      { userId: "test-user-id", email: "user@gmail.com", role: "user" },
      jwtKey,
      { expiresIn: "1h" }
    );
    adminToken = jwt.sign(
      { userId: "test-admin", email: "admin@gmail.com", role: "Admin" },
      jwtKey,
      { expiresIn: "1h" }
    );
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /products", () => {
    it("should return a list of products", async () => {
      const response = await request
        .get("/api/products")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("products");
      expect(response.body.products).toBeInstanceOf(Array);
      expect(response.body.products.length).toBeGreaterThan(0);
    });
  });

  describe("Get /products/:name", () => {
    // productName = "Zod";
    it("should return one product", async () => {
      const response = await request
        .get(`/api/products/Zod`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("product");
      expect(response.body.product).toHaveProperty("id");
      expect(response.body.product).toHaveProperty("name");
      expect(response.body.product).toHaveProperty("description");
      expect(response.body.product).toHaveProperty("price");
      expect(response.body.product).toHaveProperty("stock");
    });

    it("should return 404", async () => {
      const response = await request
        .get(`/api/products/none`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(404);
    });
  });


  describe('POST /add-product', () => {
    productName = 'New Product'
    it('should add a new product and return 201', async () => {
        const newProduct = {
            name: productName,
            description: 'Description for new product',
            price: 1000,
            stock: 10,
        };

        const response = await request.post('/api/add-product')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newProduct);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('product');
        expect(response.body.product).toHaveProperty('id');
        expect(response.body.product).toHaveProperty('name', newProduct.name);
    });

    it('should return 401 if not authenticated', async () => {
        const response = await request.post('/api/add-product')
            .send({
                name: 'Unauthorized Product',
                description: 'Should fail',
                price: 1000,
                stock: 10,
            });

        expect(response.status).toBe(401);
    });

    it('should return 400 if validation fails', async () => {
        const invalidProduct = {
            name: '', 
            description: 'Description for invalid product',
            price: 1000,
            stock: 10,
        };

        const response = await request.post('/api/add-product')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidProduct);

        expect(response.status).toBe(400);
    });
});

describe("Update /products/:name", () => {
    productName = "New Product";
    it("should update product name and return 200", async () => {
      const response = await request
        .put(`/api/products/${productName}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          updatedName: "New",
          description: "Top notch football!",
          price: 500.0,
          stock: 10,
        });
      expect(response.status).toBe(200);
    });

    it("should not update product name and return 404", async () => {
      const response = await request
        .put(`/api/products/${productName}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Zod2" });
      expect(response.status).toBe(403);
    });
  });


describe('DELETE /products/:name', () => {
    productName = 'New';
    it('should delete a product and return 200', async () => {
        const response = await request.delete(`/api/products/${productName}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('product');
        expect(response.body.product).toHaveProperty('id');
        expect(response.body.product).toHaveProperty('name');
        expect(response.body.product).toHaveProperty('description');
        expect(response.body.product).toHaveProperty('price');
        expect(response.body.product).toHaveProperty('stock');
    });


    it('should return 403 if not an admin', async () => {
         

        const response = await request.delete(`/api/products/${productName}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
    });

    it('should return 404 if the product does not exist', async () => {
        const response = await request.delete(`/api/products/nonexistent`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Product not found!');
    });
});
});
