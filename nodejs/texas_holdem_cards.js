sortMax = function(a,b) { return b>a };
toRank = function(a) { return a%13 };
toSuit = function(a) { return a/13|0 };

RANK_NAME = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
SUIT_NAME = ["Spade","Heart","Club","Diamond"];
toCardname = function(a) { return SUIT_NAME[toSuit(a)]+" "+ RANK_NAME[toRank(a)]};

cardScore = function(cards) {
    var smallPoint = function(ranks,discard){
        var POINT = [0,0.0001,0.0002,0.0004,0.0008,0.0016,0.0032,0.0064,0.0128,0.0256,0.0512,0.1024,0.2048];
        var small = 0;
        ranks.slice(discard,5).forEach(function(a){small += POINT[a]});
        return small;
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
    var straightStart = -1;
    for(var i=0;i<straightRank.length-4;i++){
        if(straightRank[i]-straightRank[i+4]==4){
            straightStart = i
            break
        }
    }
    if(straightRank[straightRank.length-4]==3 && straightRank[0]==12){
        straightStart = straightRank.length-4;
    }
    if(suitResult && straightStart>-1){
        score = 293 + straightRank[straightStart] -3;
    }else if(rankResult[0][1]==4){
        score = 280 + rankResult[0][0] + smallPoint(cardsRank,4);
    }else if(rankResult[0][1]==3 && (rankResult[1][1]==3 || rankResult[1][1]==2)){
        score = 124 + rankResult[0][0]*12 +rankResult[1][0]-((rankResult[1][0]>rankResult[0][0])?1:0);
    }else if(suitResult){
        score = 123 + smallPoint(cards.filter(function(a){return toSuit(a)==flushSuit}).sort(sortMax));
    }else if(straightStart>-1){
        score = 113 + straightRank[straightStart]-3;
    }else if(rankResult[0][1]==3){
        score = 100 + rankResult[0][0]+smallPoint(cardsRank,3);
    }else if(rankResult[0][1]==2 && rankResult[1][1]==2){
        score = 22 + rankResult[0][0]*(rankResult[0][0]-1)/2 +rankResult[1][0] +smallPoint(cardsRank,4);
    }else if(rankResult[0][1]==2){
        score = 9 + rankResult[0][0]+smallPoint(cardsRank,2);
    }else{
        score = smallPoint(cardsRank,0);
    }
    return score;
}

