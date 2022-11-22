import app from "../app.js";
import chai, { expect, should } from "chai";
import chaiAsPromised from "chai-as-promised";
// const chaiAsPromised = require("chai-as-promised");
// const sinon = require("sinon");
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { ProductById } from "../controllers/products/ProductsByIdControllers.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import chaiHttp from "chai-http";

// const expect = chai.expect;
should();
expect();
chai.use(sinonChai);
chai.use(chaiHttp);
chai.use(chaiAsPromised);
var sandbox = sinon.createSandbox();

describe("products", () => {
  let findProductStub;
  let productPayload;

  beforeEach(() => {
    // setTimeout(() => {
    //   console.log("running test");
    // }, 2000);
    productPayload = {
      productSold: 5,
      _id: new mongoose.Types.ObjectId(),
      file: "https://res.cloudinary.com/drwhbyjn9/image/upload/v1645915287/jmsja1g7kiosu77elxnm.jpg",
      name: "new request",
      description: "new test request",
      price: 990,
      category: "611c4b87d455c27134b21bc3",
      quantity: 1,
      cloudinary_id: "jmsja1g7kiosu77elxnm",
      createdAt: "2022-02-26T22:47:21.191Z",
      updatedAt: "2022-02-26T22:47:21.191Z",
      __v: 0,
    };
    // Product.deleteOne({}, (err) => {
    //   return;
    // });
    // Product.deleteOne({}, function (err) {
    //   done();
    //   return err;
    // });
    // findProductStub = sandbox
    //   .stub(Product, "findById")
    //   .resolves(productPayload);
  });
  afterEach(() => {
    // resets stubs/spies to ensure each test has a 'fresh start'
    // sandbox.restore();
    productPayload = null;
  });
  context("get", () => {
    it("should check for an id", function () {
      //TODO - figure out why I have to pass the full route if I'm importing app
      return chai
        .request(app)
        .get(`/api/v1/get-product-by-id/get-product/${productPayload._id}`)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("description");
          res.body.should.have.property("file");
          expect(res.body._id).to.be.string;
        })
        .catch(function (err) {
          return err;
        });
    });
  });
});
