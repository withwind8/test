hand = [23,30]
table = [14,3,44,24,5]

card = hand.concat(table)

sortMax = function(a,b) { return b-a };

toRank = function(a) { return a%13 };
toSuit = function(a) { return a/13|0 };

rank = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
suit = ["Spade","Heart","Club","Diamond"];
toCardname = function(a) { return suit[toSuit(a)]+" "+rank[toRank(a)]};


fff = function(cards) {
    var result = [];
    var score = 0;
    a = cards.map(toRank).sort(sortMax);
    for(var i=0;i<a.length;){
        var count = 1;
        while(a[i+count]==a[i]){
            count++;
        }
        result.push([a[i],count]);
        i+=count;
    }
    result.sort(function(a,b){
        if(b[1]==a[1]){
            return b[0]-a[0];
        }else{
            return b[1]-a[1];
        }});
    if(result[0][1]==4){
        score = 280 + result[0][0];
    }else if(result[0][1]==3 && (result[1][1]==3 || result[1][1]==2)){
        score = 124 + result[0][0]*12 +result[1][0]-((result[1][0]>result[0][0])?1:0);
    }else if(result[0][1]==3){
        score = 100 + result[0][0];
    }else if(result[0][1]==2 && result[1][1]==2){
        score = 22 + result[0][0]*(result[0][0]-1)/2 +result[1][0];
    }else if(result[0][1]==2){
        score = 9 + result[0][0];
    }
    return score;
}

