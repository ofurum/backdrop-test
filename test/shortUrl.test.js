const chai = require("chai");
const expect = chai.expect;
const urlLink = `http://localhost:8000`;
const request = require("supertest")(urlLink);
const values = [1234, true];
// const urlSchemaType = query.getType()
describe("url that is not vaild", () => { 
    it('Invalid short Url', (done) => {
        request
          .post("/graphql")
          .send({
             query: '{ shortenUrl(url: "thebulb.africa"){url}}'
          })
          .set("Accept", "application/json")
          .end((error, res) => {
            console.log(res.body.errors[0].message)
            if (error) return done(error);
            expect(res.body).to.be.an('object')
            expect(res.body.data.shortenUrl).to.be.a('null');
            expect(res.body.errors).to.be.an('array')
            expect(res.body.errors[0].message).to.include(
              "Invalid URL. Please enter a valid url for shortening e.g https://example.com"
            );
            done()
          });
    });

    it('Should have a full secured url', (done) => {
       request
          .post("/graphql")
          .send({
              query: '{ shortenUrl(url: "httpx://thebulb.africa"){url}}'
          })
            .set("Accept", "application/json")
            .end((error, res) => {
             if (error) return done(error);
              expect(res.body).to.be.an('object')
              expect(res.body.data.shortenUrl).to.be.a('null');
              expect(res.body.errors).to.be.an('array')
              expect(res.body.errors[0].message).to.include(
              "Invalid URL. Please enter a valid url for shortening e.g https://example.com"
            );
             done();
            })
    })

    it('Should have a valid url', (done) => {
      request
      .post('/graphql')
      .send({
         query: '{ shortenUrl(url: "https://buyCoins.com"){url}}'
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((error, res) => {
        if(error) return done(error)
        expect(res.body).to.be.an('object')
        expect(res.body.data.shortenUrl).to.deep.own.include(res.body.data.shortenUrl)
        done()
      })
    })

    it('Should not be an interger', (done) => {
       const value = values[Math.round(Math.random())];
          request
          .post('/graphql')
          .send({
            query: `{ shortenUrl(url: ${value} ){url}}`
          })
          .set("Accept", "application/json")
          .expect(400)
          .end((error, res) => {
          if(error) return done(error)
             expect(res.body.data).to.be.an('undefined')
             expect(res.body.errors[0].message).to.include(
              `String cannot represent a non string value: ${value}`
            );
            done();
          })
    })

});
