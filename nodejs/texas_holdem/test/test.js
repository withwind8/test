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
        it('should return 293-301 when straight flush', function(){
            var cards = [12,0,1,2,3];
            var upRank = function(n){return function(a){ return (a+n)%13}};
            for(var i=0;i<10;i++){
                Holdem.cardScore(cards.map(upRank(i))).should.equal(293+i);
            }
        })
        it('should return same when flush in all suit',function(){
            this.timeout(3000000);
            for(var i=0;i<52;i++){
                for(var j=i+1;j<52;j++){
                    for(var k=j+1;k<52;k++){
                        for(var p=k+1;p<52;p++){
                            for(var q=p+1;q<52;q++){
                                var cards = [i,j,k,p,q];
                                var upSuit = function(n){return function(a){ return (a+n*13)%52}};
                                var score = Holdem.cardScore(cards);
                                Holdem.cardScore(cards.map(upSuit(1))).should.equal(score);
                                Holdem.cardScore(cards.map(upSuit(2))).should.equal(score);
                                Holdem.cardScore(cards.map(upSuit(3))).should.equal(score);

            }}}}}
        })
    })
})
