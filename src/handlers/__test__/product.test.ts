import request from "supertest";
import server from "../../server";

describe('POST /api/products', () => {
    it('should display validation errors', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({})

        expect(response.status).toEqual(400); 
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                "name": 'Monitor curvo',
                "price": 0
            })

        expect(response.status).toEqual(400); 
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(2);
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                "name": 'Monitor curvo',
                "price": "Hola"
            })

        expect(response.status).toEqual(400); 
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(4);
    })

    it ('should create a new product', async () => {
        const response = await request(server)
            .post('/api/products')
            .send({
                name: 'Mouse testing',
                price: 50
            })

            expect(response.status).toEqual(201);
            expect(response.body).toHaveProperty('data');

            expect(response.status).not.toEqual(404);
            expect(response.status).not.toEqual(200);
            expect(response.body).not.toHaveProperty('errors');
    })
})

describe('GET /api/products', () =>{
    it('should check if api/products url exists', async () => {
        const response = await request(server)
            .get('/api/products')
        expect(response.status).not.toEqual(404);
    })
    it('GET a JSON response with all products', async () => {
        const response = await request(server)
            .get('/api/products')
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);
        expect(response.body).not.toHaveProperty('errors');
    })
})