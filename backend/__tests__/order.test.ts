import supertest from "supertest";
import { app, server } from "../index";
import jwt from "jsonwebtoken";

const request = supertest(app);

describe("Order Routes", () => {
  let token: string;

  beforeAll(() => {
    const jwtKey = process.env.JWT_SECRET || "default_secret_key";
    token = jwt.sign(
      { userId: "test-user-id", email: "user@gmail.com", role: "user" },
      jwtKey,
      { expiresIn: "1h" }
    );
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("POST /create-order", () => {
    it("should create a new order and return 200", async () => {
      const orderData = {
        userId: 1,
        products: [{ productId: 2, quantity: 1 }],
        customerName: "Akash",
      };

      const response = await request
        .post("/api/create-order")
        .set("Authorization", `Bearer ${token}`)
        .send(orderData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("order");
      expect(response.body).toHaveProperty("invoice");
      expect(response.body.order).toHaveProperty("id");
      expect(response.body.order).toHaveProperty("userId", orderData.userId);
      expect(response.body.invoice).toHaveProperty("totalAmount");
    });

    it("should return 400 if validation fails", async () => {
      const invalidOrderData = {
        userId: "",
        products: [{}],
        customerName: "Zod",
      };

      const response = await request
        .post("/api/create-order")
        .set("Authorization", `Bearer ${token}`)
        .send(invalidOrderData);

      expect(response.status).toBe(400);
    });
  });


  describe('GET /orders/:orderId', () => {
    it('should return an order by ID', async () => {
        const orderId = 2; 
        
        const response = await request.get(`/api/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order).toHaveProperty('products');
        expect(response.body.order).toHaveProperty('orderTotal');
        expect(response.body.order).toHaveProperty('employeeName');
        expect(response.body.order).toHaveProperty('id', orderId);
    });

    it('should return 500 if the order is not found', async () => {
        const response = await request.get('/api/orders/999')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
});


describe('GET /orders', () => {
    it('should return a list of all orders', async () => {
        const response = await request.get('/api/orders')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('orders');
        expect(response.body.orders.orders).toBeInstanceOf(Array);
        expect(response.body.orders.orders.length).toBeGreaterThan(0);
    });
});


describe('PUT /orders', () => {
    it('should update the status of an order and return 200', async () => {
        const updateData = { orderId: 2, status: 'Shipped' };
        
        const response = await request.put('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(updateData);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('order');
        expect(response.body.order).toHaveProperty('status', updateData.status);
    });

    it('should return 400 if validation fails', async () => {
        const invalidUpdateData = { orderId: '', status: '' };
        
        const response = await request.put('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidUpdateData);
        
        expect(response.status).toBe(400);
    });
});


});
