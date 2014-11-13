sortMax = function(a,b) { return b>a };
toRank = function(a) { return a%13 };
toSuit = function(a) { return a/13|0 };

RANK_NAME = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
SUIT_NAME = ["Spade","Heart","Club","Diamond"];
toCardname = function(a) { return SUIT_NAME[toSuit(a)]+" "+ RANK_NAME[toRank(a)]};

cardScore = function(cards) {
    var smallPoint = function(ranks,no){
        var POINT = [0,0.0001,0.0002,0.0004,0.0008,0.0016,0.0032,0.0064,0.0128,0.0256,0.0512,0.1024,0.2048];
        return ranks.slice(0,no).reduce(function(a,b){return a+POINT[b]},0)
    }
    var cardsRank = cards.map(toRank).sort(sortMax);
    var cardsSuit = cards.map(toSuit).sort();
    var countSame = function(array){
        var result =[];
        for(var i=0;i<array.length;){
            var count = 1;
            while(array[i+count]==array[i]){
                count++;
            }
            result.push([array[i],count]);
            i+=count;
        }
        return result
    }
    var rankResult = countSame(cardsRank).sort(function(a,b){ return (b[1]==a[1])?(b[0]>a[0]):(b[1]>a[1]);});
    var flushSuit;
    var suitResult = countSame(cardsSuit).some(function(a){return flushSuit=a[0],a[1]>=5;});
    var straightRank = rankResult.map(function(a){return a[0]}).sort(sortMax);
    var checkStraight = function(array){
        var result = -1
        for(var i=0;i<array.length-4;i++){
            if(array[i]-array[i+4]==4){
                result = i
                break
            }
        }
        if(array[array.length-4]==3 && array[0]==12){
            straightStart = array.length-4;
        }
        return result
    }
    var straightStart = checkStraight(straightRank);
    var suitRank = cards.filter(function(a){return toSuit(a)==flushSuit}).sort(sortMax);
    var suitStraightStart = checkStraight(suitRank);
    if(suitResult && suitStraightStart>-1){
        score = 293 + suitRank[suitStraightStart] -3;
    }else if(rankResult[0][1]==4){
        score = 280 + rankResult[0][0] + smallPoint(cardsRank.filter(function(a){return a!=rankResult[0][0]}),1);
    }else if(rankResult[0][1]==3 && (rankResult[1][1]==3 || rankResult[1][1]==2)){
        score = 124 + rankResult[0][0]*12 +rankResult[1][0]-((rankResult[1][0]>rankResult[0][0])?1:0);
    }else if(suitResult){
        score = 123 + smallPoint(suitRank,5);
    }else if(straightStart>-1){
        score = 113 + straightRank[straightStart]-3;
    }else if(rankResult[0][1]==3){
        score = 100 + rankResult[0][0]+smallPoint(cardsRank.filter(function(a){return a!=rankResult[0][0]}),2);
    }else if(rankResult[0][1]==2 && rankResult[1][1]==2){
        score = 22 + rankResult[0][0]*(rankResult[0][0]-1)/2 +rankResult[1][0] +smallPoint(cardsRank.filter(function(a){return a!=rankResult[0][0]&&a!=rankResult[1][0]}),1);
    }else if(rankResult[0][1]==2){
        score = 9 + rankResult[0][0]+smallPoint(cardsRank.filter(function(a){return a!=rankResult[0][0]}),3);
    }else{
        score = smallPoint(cardsRank,5);
    }
    return score;
}

table = [14,5,6,7,8]
players = [["tom",[15,17],100,2],["tim",[22,24],200,0],["jim",[35,37],50,2]];
//for one player [name,cards,bets,status]  status 0 call 1 flod 2 allin 
gameResult = function(cards,players){
    var score = players.map(function(a){return cardScore(cards.concat(a[1]))});
    players.forEach(function(v,i){v.push(score[i])});
    players.sort(function(a,b){return b[4]>a[4]&&b[3]!=1});

    var winners = players.filter(function(a){return a[4]==players[0][4] && a[3]!=1 });

    console.log(winners);
    var part = winners.reduce(function(a,b){return (b[2]<a)?b[2]:a},10000000000);
    console.log(part);

    var prize = 0;
    players.forEach(function(a){
        if(a[2]>part){
            prize += part;
            a[2] -= part;
        }else{
            prize += a[2];
            a[2]=0;
            a[3]=2;
        }
    })
    console.log(prize);

    

    if(players.some(function(a){return a[2]!=0})){
        gameResult(cards,players);
    }
}


gameResult(table,players);
