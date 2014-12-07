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

//players is array, for one player [name,cards,bets,status]  status 0 call 1 flod 2 allin 
gameResult = function(cards,players){
    if(players[0][4]==undefined){
        var score = players.map(function(a){return cardScore(cards.concat(a[1]))});
        players.forEach(function(v,i){v.push(score[i])});
    }
    players.sort(function(a,b){return b[4]>a[4]&&b[3]!=1});
    var winners = players.filter(function(a){return a[4]==players[0][4] && a[3]!=1 });
    var part = winners.reduce(function(a,b){return (b[2]<a)?b[2]:a},10000000000);

    var prize = 0;
    players.forEach(function(a){
        if(a[2]>part){
            prize += part;
            a[2] -= part;
        }else{
            prize += a[2];
            a[2]=0;
            a[3]=1;
        }
    })
    eachPrize = prize/winners.length;
    winners.forEach(function(a){
        if(a[5]==undefined){
            a[5]=eachPrize;
        }else{
            a[5]+=eachPrize;
        }
    });

    if(players.some(function(a){return a[2]!=0})){
        gameResult(cards,players);
    }
}


table = [14,5,6,7,8]
players = [["tom",[15,17],100,2],["tim",[22,24],200,0],["jim",[35,37],50,2]];
gameResult(table,players);
console.log("On Table:");
table.forEach(function(a){console.log(toCardname(a))});
players.forEach(function(a){
    if(a[5]!==undefined){
        console.log(a[0]," ",toCardname(a[1][0])," ",toCardname(a[1][1])," win ",a[5]);
    }
})



TEXAS_HOLDEM_ROUND = {
    "PRE_FLOP":0,
    "FLOP":1,
    "TURN":2,
    "RIVER":3
};

texasHoldedFSM = function(table, action){
    var current = table.players[table.current];
    if(action.playerName!=current.name){
        return 1; //非当前玩家操作
    }
    if(action.bet>table.players[table.current].cash){
        return 2; //下注金额不足
    }

    if(action.bet <0){
        current.fold = true;
    }else{
        if((action.bet < table.maxRoundBet - current.bets_round)&&(action.bet!=current.cash)){
            return 3; //下注不符规则，不够跟注，而且不是全下
        }
        if((action.bet > table.maxRoundBet - current.bets_round)
            &&(action.bet <table.maxRoundBet + table.raise - current.bets_round)
            &&(action.bet!=current.cash)){
            return 4; //下注不符规则，不够加注，而且不是全下
        }

        current.bets_round += action.bet;
        current.cash -= action.bet;

        if(current.bets_round - table.maxRoundBet >= table.raise){
            table.raise = current.bets_round - table.maxRoundBet;
            table.raiser = table.current;
        }

        if(current.bets_round > table.maxRoundBet){
            table.maxRoundBet = current.bets_round;
        }
    }

    do{
        table.current = (table.current+1)%table.players.length;
        if(table.current==table.raiser){
            return 100; //round结束
        }
    }while((table.players[table.current].cash==0)||(table.players[table.current].fold))

    return 0; //OK 继续
}

Table = function(smallBlind, bigBlind,minBuyIn,maxBuyIn,defaultBuyIn){
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;
    this.minBuyIn = minBuyIn;
    this.maxBuyIn = maxBuyIn;
    this.defaultBuyIn = defaultBuyIn;
    this.players=[];
}
Table.prototype.buyIn = function(name, cash){
    var cash = cash || this.defaultBuyIn;
    this.players.push({name:name,cash:cash,bets_all:0,bets_round:0,fold:false,cards:[]});
}
Table.prototype.startGame = function(){
    this.dealer = 0;
    this.players[(this.dealer+1)%this.players.length].bets_round = this.smallBlind;
    this.players[(this.dealer+1)%this.players.length].cash -= this.smallBlind;
    this.players[(this.dealer+2)%this.players.length].bets_round = this.bigBlind;
    this.players[(this.dealer+2)%this.players.length].cash -= this.bigBlind;
    this.current = (this.dealer+3)%this.players.length;
    this.raiser = this.current;//BB在首轮是有加注的机会，初始加注者应该为BB的下手
    this.raise = table.bigBlind;
    this.maxRoundBet=10;

    this.cards=[];
    while(this.cards.length < 5+2*this.players.length){
        var newCard = Math.floor(Math.random()*52);
        if(!this.cards.some(function(a){return a==newCard;})){
            this.cards.push(newCard);
        }
    }
    for(var i=0;i<this.players.length;i++){
        this.players[i].cards.push(this.cards.pop());
        this.players[i].cards.push(this.cards.pop());
    }

    this.round = TEXAS_HOLDEM_ROUND.PRE_FLOP;
}
Table.prototype.action=function(name,bet){
    return texasHoldedFSM(this,{playerName:name,bet:bet});
}

table = new Table(5,10,100,800,400);
table.buyIn("tom");
table.buyIn("john");
table.buyIn("liqing",500);
table.buyIn("lilong");
table.startGame();
table.action("lilong",500);


