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
        it('should return 280-292 when Four of a kind', function(){
            for(var i=0;i<13;i++){
                var cards = [i,i+13,i+26,i+39,(i==0?1:0)];
                var score = Holdem.cardScore(cards);
                if(cards[4]==0){
                    score.should.equal(280+i);
                }else{
                    score.should.above(280+i)
                }
                var previousScore = score;

                for(var j=0;j<11;j++){
                    if(++cards[4] == i) ++cards[4];
                    score = Holdem.cardScore(cards);
                    score.should.above(previousScore);
                    previousScore = score;
                }
                previousScore.should.below(280+i+1);
            }
        })
        it('should return 124-279 when fullhouse', function(){
            var score = 124;
            for(var i=0;i<13;i++){
                for(var j=0;j<13;j++){
                    if(i==j) continue;
                    Holdem.cardScore([i,i+13,i+26,j,j+13]).should.equal(score++);
                }
            }
            score.should.equal(280);
        })
        it('should return 123 when flush', function(){
            var previousScore = 124;
            for(var i=12;i>=0;i--){
                for(var j=i-1;j>=0;j--){
                    for(var k=j-1;k>=0;k--){
                        for(var p=k-1;p>=0;p--){
                            for(var q=p-1;q>=0;q--){
                                if(((i-q)==4)||(i==12 && q==0 && j ==3))  continue;
                                var score = Holdem.cardScore([i,j,k,p,q]);
                                score.should.below(previousScore);
                                previousScore = score;
            }}}}}
            previousScore.should.above(123);
        })
        it('should return 113-122 when straight', function(){
            //TODO: not cover all combinations
            for(var i=0;i<10;i++){
                Holdem.cardScore([i,i+1,i+2,i+3,i+12+13]).should.equal(113+i);
            }
        })
        it('should return 100-112 when three of a kind', function(){
            //TODO: not cover all combinations
            for(var i=12;i>=0;i--){
                var previousScore = 100+i+1;
                for(var j=12;j>=0;j--){
                    if(i==j) continue;
                    for(var k=j-1;k>=0;k--){
                        if(i==k) continue;
                        var score = Holdem.cardScore([i,i+13,i+26,j,k]);
                        score.should.below(previousScore);
                        previousScore=score;
                    }
                }
                previousScore.should.above(100+i);
            }
        })
        it('should return 22-99 when two pairs', function(){
            //TODO: not cover all combinations
            var bigScore=99
            for(var i=12;i>=0;i--){
                for(var j=i-1;j>=0;j--){
                    var previousScore = bigScore+1
                    for(var k=12;k>=0;k--){
                        if(k==i || k==j) continue;
                        var score = Holdem.cardScore([i,i+13,j,j+13,k]);
                        score.should.below(previousScore);
                        previousScore=score;
                    }
                    if(j==0){
                        previousScore.should.above(bigScore);
                    }else{
                        previousScore.should.equal(bigScore);
                    }
                    bigScore--;
                }
            }
            bigScore.should.equal(21);
        })
        it('should return 9-21 when one pairs', function(){
            //TODO: not cover all combinations
            for(var i=12;i>=0;i--){
                var bigScore = 9+i;
                var previousScore = bigScore+1;
                for(var j=12;j>=0;j--){
                    if(j==i) continue;
                    for(var k=j-1;k>=0;k--){
                        if(k==i) continue;
                        for(var l=k-1;l>=0;l--){
                            if(l==i) continue;
                            var score = Holdem.cardScore([i,i+13,j,k,l]);
                            score.should.below(previousScore);
                            previousScore = score;
                }}}
                previousScore.should.above(bigScore);
            }
        })
        it('should return 0-1 when high card', function(){
            //TODO: not cover all combinations
            var previousScore = 1;
            for(var i=12;i>=0;i--){
                for(var j=i-1;j>=0;j--){
                    for(var k=j-1;k>=0;k--){
                        for(var l=k-1;l>=0;l--){
                            for(var m=l-1;m>=0;m--){
                                if(((i-m) == 4)||(i==12 && j==3 && m==0)) continue;
                                var score = Holdem.cardScore([i,j,k,l,m+13]);
                                score.should.below(previousScore);
                                previousScore = score;
            }}}}}
            previousScore.should.above(0);
        })




        /*
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
*/
    })
})
