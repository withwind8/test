//var assert = require("assert")
var should = require("should")

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
    describe('cardScroe functiin', function(){
        it('should return 302 when royal straight flush', function(){
        })
    })
})
