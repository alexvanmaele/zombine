var expect = require('chai').expect;
var should = require('chai').should();
var zombine = require('../zombine.js');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
// MAIN TESTS
describe('#browse', function()
{
  beforeAll(function(done)
  {
    console.log('Setting up zombine...');
    zombine.init().then(function()
    {
      done();
    });
  });
  it('returns something', function()
  {
    expect(zombine.browse('example.com')).to.exist;
  });
  it('returns a promise', function()
  {
    zombine.browse('example.com').then.should.be.a('function');
  });
});