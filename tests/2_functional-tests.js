/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

/* eslint-disable no-underscore-dangle */
/* global suite test */

const chaiHttp = require('chai-http');
const chai = require('chai');

const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test('#example Test GET /api/books', (done) => {
    chai
      .request(server)
      .get('/api/books')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite('Routing tests', () => {
    const testBook = { title: 'test book' };

    suite('POST /api/books with title => create book object/expect book object', () => {
      test('Test POST /api/books with title', (done) => {
        chai
          .request(server)
          .post('/api/books')
          .send(testBook)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, '_id', 'Response should include an id.');
            assert.property(res.body, 'title', 'Response should include a title.');
            assert.property(res.body, 'comments', 'Response should include comments');
            assert.equal(res.body.title, 'test book', 'Title should match.');
            assert.isArray(res.body.comments, 'Comments should be an Array.');
            assert.equal(res.body.comments.length, 0, 'Comments should be empty.');

            testBook._id = res.body._id;
            done();
          });
      });

      test('Test POST /api/books with no title given', (done) => {
        chai
          .request(server)
          .post('/api/books')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing title', 'Response should state missing title.');
            done();
          });
      });
    });

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books', (done) => {
        chai
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'Response should be an array.');
            assert.property(
              res.body[0],
              'commentcount',
              'Books in array should contain commentcount',
            );
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db', (done) => {
        chai
          .request(server)
          .get('/api/books/aaaaaaaaaaaa')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists', 'Response should state no book exists.');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', (done) => {
        chai
          .request(server)
          .get(`/api/books/${testBook._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, '_id', 'Response should include an id.');
            assert.property(res.body, 'title', 'Response should include a title.');
            assert.property(res.body, 'comments', 'Response should include comments.');
            assert.equal(res.body._id, testBook._id, 'Ids should match.');
            assert.equal(res.body.title, testBook.title, 'Titles should match.');
            assert.isArray(res.body.comments, 'Comments should be an array.');
            done();
          });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      test('Test POST /api/books/[id] with comment', (done) => {
        chai
          .request(server)
          .post(`/api/books/${testBook._id}`)
          .send({ comment: 'test comment' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.property(res.body, '_id', 'Response should include an id.');
            assert.property(res.body, 'title', 'Response should include a title.');
            assert.property(res.body, 'comments', 'Response should include comments.');
            assert.equal(res.body._id, testBook._id, 'Ids should match.');
            assert.equal(res.body.title, testBook.title, 'Titles should match.');
            assert.isArray(res.body.comments, 'Comments should be an array.');
            assert.include(
              res.body.comments,
              'test comment',
              'Comments should include new comment.',
            );
            done();
          });
      });
    });

    suite('DELETE /api/books/[id] => response confirming deletion or no book found', () => {
      test('Test DELETE /api/books/[id] with invalid id', (done) => {
        chai
          .request(server)
          .delete('/api/books/aaaaaaaaaaaa')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists', 'Response should state no book exists.');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with valid id', (done) => {
        chai
          .request(server)
          .delete(`/api/books/${testBook._id}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful', 'Response shlud state delete successful.');
            done();
          });
      });
    });
  });
});
