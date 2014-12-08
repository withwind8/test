//var assert = require("assert")
var should = require("should")
var Holdem = require("../lib/texas_holdem_cards.js")

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      //assert.equal(-1, [1,2,3].indexOf(5));
      //assert.equal(-1, [1,2,3].indexOf(0));
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    })
  })
})

describe('texas holdem', function(){
    describe('cardScore functiin', function(){
        it('should return 302 when royal straight flush', function(){
            Holdem.cardScore([12,11,10,9,8]).should.equal(302);
            Holdem.cardScore([25,24,23,22,21]).should.equal(302);
            Holdem.cardScore([38,37,36,35,34]).should.equal(302);
            Holdem.cardScore([51,50,49,48,47]).should.equal(302);
        })
    })
})
