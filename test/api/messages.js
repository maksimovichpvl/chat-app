const should = require('should');
const request = require('supertest');
const server = require('../../server');

describe('Messages', function() {

    describe('GET /message (Get all messages)', function() {
      it('should return a correct response', function(done) {

        request(server)
          .get('/api/messages')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('success').and.be.a.Boolean();
            res.body.should.have.property('data').and.be.Object()
            done();
          });
      });
    });

    describe('POST /message (Create Message)', function() {
      it('should return a correct response', function(done) {
        request(server)
          .get('/api/messages')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.have.property('success').and.be.a.Boolean();
            res.body.should.have.property('data').and.be.Array()
            done();
          });
      });
    });

  });