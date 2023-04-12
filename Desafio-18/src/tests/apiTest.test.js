import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

describe("Test API", () => {
    describe("Method GET", () => {
        it("The request will return status 200", async () => {
            const res = await request.get("/products");
            expect(res.status).to.equal(200);
        })
    }); 

    describe("Method POST", () => {
        it("This must save a product", async () => {
            const newProduct = {
                productName: "Iphone 13",
                description: "Iphone 13 with charger included",
                stock: 10,
                price: 1200
            }
            const res = await request.post("/products").send(newProduct);
            expect(res.status).to.equal(200);
            const body = res.body;
            expect(body).to.include.keys("newProduct")
        })
    })
})