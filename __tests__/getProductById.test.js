// import supertest from "supertest";
// import app from "../app.js";
// import dotenv from "dotenv";
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";
// import { ProductById } from "../controllers/products/ProductsByIdControllers";
// import Product from "../models/Product.js";

// dotenv.config();

// // const request = supertest(app);
// describe("Product", () => {
//   const productPayload = {
//     productSold: 5,
//     _id: "621aadf9eca4f731f4f69c96",
//     file: "https://res.cloudinary.com/drwhbyjn9/image/upload/v1645915287/jmsja1g7kiosu77elxnm.jpg",
//     name: "new request",
//     description: "new test request",
//     price: 990,
//     category: "611c4b87d455c27134b21bc3",
//     quantity: 1,
//     cloudinary_id: "jmsja1g7kiosu77elxnm",
//     createdAt: "2022-02-26T22:47:21.191Z",
//     updatedAt: "2022-02-26T22:47:21.191Z",
//     __v: 0,
//   };
//   let connection;
//   let db;

//   jest.setTimeout(6000);
//   beforeAll(async () => {
//     connection = await MongoClient.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = await connection.db(process.env.MONGO_DB_NAME);
//   });

//   afterAll(async () => {
//     await connection.close();
//     jest.resetAllMocks();
//   });

//   // test route
//   it("should return 200 when requesting a product", () => {
//     const response = supertest(app)
//       .get(`/api/v1/get-product-by-id/get-product/${productPayload._id}`)
//       .expect("Content-Type", "application/json; charset=utf-8")
//       .expect(200);
//     // can add jest assertions to ensure that the objects match
//     // console.log(response);
//   });
//   // test controller
//   it("should return a product when given a valid productId", () => {
//     const ProductById = jest.fn();
//     Product.findOne = jest.fn().mockImplementation(() => {
//       return {
//         productPayload,
//       };
//     });
  
//     expect(ProductById).t
//   });
//   // it("should return an empty object for a product that does not exist", () => {
//   //   productPayload._id = mongoose.Types.ObjectId();
//   //   const response = supertest(app)
//   //     .get(`/api/v1/get-product-by-id/get-product/${productPayload}`)
//   //     .expect("Content-Type", "application/json; charset=utf-8")
//   //     .expect(404);
//   //   console.log("false", response);
//   //   return response;
//   // });
// });

// // it("should return the doc with valid id", async () => {
// //   // mockingoose(Product).toReturn(_doc, "findOne");
// //   // const results = await ProductById(_doc._id);
// //   // return model.findById({ _id: _doc._id }).then((doc) => {
// //   //   const res = JSON.parse(JSON.stringify(doc));
// //   // expect(res).toMatchObject(_doc);
// //   //   expect(res.name).toBe(_doc.name);
// //   // });
// // });

// // it("should not return the doc with invalid id", () => {
// //   _doc._id = "some random id";
// //   mockingoose(Product).toReturn(_doc, "find");
// //   return Product.findById({ _id: _doc._id }).then((doc) => {
// //     const res = JSON.parse(JSON.stringify(_doc));
// //     expect(res._id).toBe(null);
// //   });
// // });

// // describe('fetchBook', () => {
// //   it ('should return a book', async () => {
// //     mockingoose(BooksModel).toReturn(
// //       {
// //         _id: 1,
// //         title: 'Book 1',
// //         author: {
// //           firstname: 'John',
// //           lastname: 'Doe'
// //         },
// //         year: 2021,
// //       }, 'findOne');
// //     const results = await fetchBook(1);
// //     expect(results.title).toBe('test');
// //   });
// // });
