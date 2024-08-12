import supertest from 'supertest';
import { app, server } from '../index';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('Sales Routes', () => {
    let token: string;

    beforeAll(() => {
        const jwtKey = process.env.JWT_SECRET || 'default_secret_key';
        token = jwt.sign({ userId: 'test-user-id', email: 'user@gmail.com', role: 'user' }, jwtKey, { expiresIn: '1h' });
    });

    afterAll((done) => {
        server.close(done);
    });

    describe('GET /sales/week', () => {
        it('should return sales data for the past week', async () => {
            const response = await request.get('/api/sales/week')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('totalSales');
        });
    });

    describe('GET /sales/month', () => {
        it('should return sales data for the past month', async () => {
            const response = await request.get('/api/sales/month')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('totalSales');
        });
    });

    describe('GET /sales/details', () => {
        it('should return detailed sales data', async () => {
            const response = await request.get('/api/sales/details')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('sales');
            expect(response.body.sales).toBeInstanceOf(Array);
            expect(response.body.sales[0]).toHaveProperty('saleDate');
        });
    });

    describe('GET /sales', () => {
        it('should return sales data product-wise', async () => {
            const response = await request.get('/api/sales')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });
});
