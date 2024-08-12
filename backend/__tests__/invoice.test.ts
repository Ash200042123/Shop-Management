import supertest from "supertest";
import { app,server } from "../index";
import jwt from "jsonwebtoken";


const request = supertest(app);

describe('Invoice Routes Test', () => { 
    let token: string;
    let adminToken: string;

    beforeAll(()=>{
        const jwtKey = process.env.JWT_SECRET || "default_secret_key";

        token = jwt.sign(      { userId: "test-user-id", email: "user@gmail.com", role: "user" },jwtKey, {expiresIn: '1h'});
        adminToken = jwt.sign(      { userId: "test-admin-id", email: "admin@gmail.com", role: "Admin" },jwtKey, {expiresIn: '1h'});
    });

    afterAll((done)=>{
        server.close(done);
    });

    describe('Get all invoices from /invoices',()=>{
        it('should return status 200 and invoices',async()=>{
            const response = await request.get('/api/invoices')
            .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('invoices');
            expect(response.body.invoices).toBeInstanceOf(Array);
        });
    });

    describe('Get individual invoice from /invoices/:id',()=>{
        const invoiceId = 3;
        it('should return status 200 and an invoice',async()=>{
            const response = await request.get(`/api/invoices/3`)
            .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id',3);
            expect(response.body).toHaveProperty('invoiceDate');
            expect(response.body).toHaveProperty('totalAmount');
        });

        it('should return 500 if validation fails', async () => {
            const response = await request.get('/api/invoices/invalid-id')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message','Internal server error');
        });
    });


    describe('DELETE /invoices/:invoiceId', () => {
        it('should delete the invoice and return 200', async () => {
            const response = await request.delete('/api/invoices/7')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('invoice');
            expect(response.body.invoice).toHaveProperty('id', 6);
        });
    
        it('should return 500 if the invoice does not exist', async () => {
            const response = await request.delete('/api/invoices/9999')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Internal server Error');
        });
    
        it('should return 403 if user is not admin', async () => {
            const response = await request.delete('/api/invoices/3')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('message');
        });
    
        it('should return 400 if validation fails', async () => {
            const response = await request.delete('/api/invoices/invalid-id')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(response.status).toBe(400);
        });
    });
    
 })