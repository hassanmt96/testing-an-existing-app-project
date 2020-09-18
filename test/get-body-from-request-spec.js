const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {

    const bodyR = getBodyFromRequest(fakeReq);

    fakeReq.emit('end');

    bodyR
      .then(body => {
        if (body === '') {
          done();
        } else {
          done(`Failed. Got "${body}"`)
        }
      })

  });

  it('returns the data read from the stream', done => {
    const bodyR = getBodyFromRequest(fakeReq);

    const d1 = 'Here is'
    const d2 = 'data from the stream'

    fakeReq.emit('data', d1)
    fakeReq.emit('data', d2)

    fakeReq.emit('end');

    bodyR
    .then(body => {
      if (body === d1 + d2) {
        done();
      } else {
        done(`Failed. Got "${body}"`)
      }
    })

  });
});
