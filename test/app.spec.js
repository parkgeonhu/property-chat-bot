const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../index");
const expect = chai.expect;

chai.use(chaiHttp);

describe("HSSP CI", () => {
  after(() => {
    server.close();
  });

  it("TEST : api/auth/sample1", done => {
    chai
      .request(server)
      .get("/api/auth/sample1")
      /*expected response body
      {"task":"sample","status" : "success"};
      */
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).equal("success");
        done();
      });
  });
});