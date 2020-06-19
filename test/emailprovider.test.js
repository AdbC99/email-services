let expect = require('chai').expect;
let emailProvider = require('../components/providers/emailprovider');
let email = new emailProvider();

describe('email validation', function() {
  context('email address validator', function() {
    it('Check valid addresses succeed', function() {
      expect(email.validEmail("alix.1999@gmail.com")).to.equal(true);
      expect(email.validEmail("alistair <alix.1999@gmail.com>")).to.equal(true);
    })
    it('Check invalid email address fail', function() {
      expect(email.validEmail("alistair <alix.1999gmail.com>")).to.equal(false);
      expect(email.validEmail("alix.1999gmail.com")).to.equal(false);
    })
  })
  context('email object validator', function() {
    it('Expect an empty email object to throw an error', function() {
      expect(()=>{email.validate({})}).to.throw("Must have a from email address");
    })
    let test1 = {
      from:'alistair',
      subject:'subject',
      body:'body',
      to:'alix.1999@gmail.com'
    }
    it('Expect an invalid email object to throw an error', function() {
      expect(()=>{email.validate(test1)}).to.throw("alistair is not a valid email address");
    })
  })
})