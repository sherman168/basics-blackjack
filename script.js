var GAME_START = "game start";
var FIRST_DRAW = "first draw";
var HIT_STAND = "hit or stand mode";
var gameMode = GAME_START;

var playerHand = [];
var compHand = [];

//check BJK conditions
var checkBJK = function (array) {
  var cardOne = array[0];
  var cardTwo = array[1];
  var isBJK = false;
  if (
    (cardOne.name == "A" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "A")
  ) {
    isBJK = true;
  }
  return isBJK;
};

//Sum cards up
var checkSum = function (array) {
  var sum = 0;
  var index = 0;
  while (index < array.length) {
    var currCard = array[index];
    if (currCard.name == "J" || currCard.name == "Q" || currCard.name == "K") {
      sum += 10;
    } else {
      sum += currCard.rank;
    }
    index += 1;
  }
  return sum;
};
var myWinImage = `<img src="https://en.pimg.jp/057/689/170/1/57689170.jpg"/>`;
var myImage =
  '<img src="https://cdn5.vectorstock.com/i/1000x1000/94/09/loser-hand-sign-vector-25169409.jpg"/>';

var main = function (input) {
  var myOutputValue = "";
  //Draw two cards each first
  if (gameMode == GAME_START) {
    playerHand = [];
    compHand = [];
    var shuffDeck = shuffleDeck(deck);

    playerHand.push(shuffDeck.pop());
    playerHand.push(shuffDeck.pop());
    compHand.push(shuffDeck.pop());
    compHand.push(shuffDeck.pop());

    gameMode = FIRST_DRAW;

    myOutputValue = `你抽了两张卡。请提交查看。`;
    return myOutputValue;
  }

  if (gameMode == FIRST_DRAW) {
    //check for BJK
    var playerBJK = checkBJK(playerHand);
    var compBJK = checkBJK(compHand);
    //BlkJk conditions
    if (playerBJK == true || compBJK == true) {
      if (playerBJK == true && compBJK == true) {
        myOutputValue = `Tie by Blackjack. Click submit to play again`;
        gameMode = GAME_START;
      } else if (playerBJK == false) {
        myOutputValue = `Computer won. It drew<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>Click submit to play again.`;
        gameMode = GAME_START;
      } else {
        myOutputValue = `You won. You drew<br>${playerHand.name[0]} of ${playerHand.suit[0]}<br>${playerHand.name[1]} of ${playerHand.suit[1]}<br>Click submit to play again.`;
        gameMode = GAME_START;
      }
      return myOutputValue;
    }
    //No BJK, display cards and sum then ask hit or stand
    else {
      var playerSum = checkSum(playerHand);
      console.log(playerSum);
      console.log(playerHand);
      var compSum = checkSum(compHand);
      console.log(compSum);
      myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>它的总数是 ${compSum}<br>要 Hit 或 Stand？`;
      gameMode = HIT_STAND;
      return myOutputValue;
    }
  }

  if (gameMode == HIT_STAND) {
    if (input == "hit") {
      var shuffDeck = shuffleDeck(deck);
      playerHand.push(shuffDeck.pop());
      var playerSum = checkSum(playerHand);
      var compSum = checkSum(compHand);
      console.log(playerSum);
      //if player breaks 21
      if (Number(playerSum) > 21) {
        myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>${playerHand[2].name} of ${playerHand[2].suit}<br>总数是 ${playerSum}<br>你输了。。。<br>${myImage}`;
        gameMode = GAME_START;
        return myOutputValue;
      } //if player dont break 21
      else if (Number(playerSum) <= 21) {
        //computer draws if below 17
        var kacangPuteh = "";
        if (Number(compSum) <= 17) {
          compHand.push(shuffDeck.pop());
          compSum = checkSum(compHand);
          kacangPuteh = `${compHand[2].name} of ${compHand[2].suit}<br>`;
        }
        //player wins or comp breaks 21
        if (Number(compSum) < Number(playerSum) || Number(compSum) >= 21) {
          myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>${playerHand[2].name} of ${playerHand[2].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}它的总数是 ${compSum}<br>你赢了！点击“提交”，再来一轮吧！<br>${myWinImage}`;
          gameMode = GAME_START;
          return myOutputValue;
        }
        //player lose
        else if (Number(compSum) > Number(playerSum) && Number(compSum) <= 21) {
          myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>${playerHand[2].name} of ${playerHand[2].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}总数是 ${compSum}<br>你输了。点击“提交”，再来一轮吧。<br>${myImage}`;
          gameMode = GAME_START;
          return myOutputValue;
        }
        //else if comp = player
        else {
          myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>${playerHand[2].name} of ${playerHand[2].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}它的总数是 ${compSum}<br>平手！点击“提交”，再来一轮吧。`;
          gameMode = GAME_START;
          return myOutputValue;
        }
      }
    }
    if (input == "stand") {
      var shuffDeck = shuffleDeck(deck);
      var playerSum = checkSum(playerHand);
      var compSum = checkSum(compHand);
      var kacangPuteh = "";
      if (Number(compSum) <= 17) {
        compHand.push(shuffDeck.pop());
        compSum = checkSum(compHand);
        kacangPuteh = `${compHand[2].name} of ${compHand[2].suit}<br>`;
      }
      //player wins or comp breaks 21
      if (Number(compSum) < Number(playerSum) || Number(compSum) > 21) {
        myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>你的总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}它的总数是 ${compSum}<br>你赢了。点击“提交”再来一轮吧<br>${myWinImage}`;
        gameMode = GAME_START;
        return myOutputValue;
      }
      //player lose
      else if (Number(compSum) > Number(playerSum) && Number(compSum) <= 21) {
        myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}它的总数是 ${compSum}<br>你输了。点击“提交”再来一轮吧。<br>${myImage}`;
        gameMode = GAME_START;
        return myOutputValue;
      }
      //else if comp = player
      else {
        myOutputValue = `你抽了<br>${playerHand[0].name} of ${playerHand[0].suit}<br>${playerHand[1].name} of ${playerHand[1].suit}<br>总数是 ${playerSum}<br>电脑先生抽了<br>${compHand[0].name} of ${compHand[0].suit}<br>${compHand[1].name} of ${compHand[1].suit}<br>${kacangPuteh}它的总数是${compSum}<br>平手。点击“提交”再来一轮吧。`;
        gameMode = GAME_START;
        return myOutputValue;
      }
    } else {
      return `别乱输入废话。`;
    }
  }
};

//Random number
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//Shuffle deck
var shuffleDeck = function (deck) {
  var index = 0;
  while (index < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    currCard = deck[index];
    randomCard = deck[randomIndex];

    deck[index] = randomCard;
    deck[randomIndex] = currCard;
    index += 1;
  }
  return deck;
};

//Deck
var deck = [
  {
    name: "A",
    suit: "♥️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♥️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♥️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♥️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♥️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♥️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♥️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♥️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♥️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♥️",
    rank: 10,
  },
  {
    name: "J",
    suit: "♥️",
    rank: 11,
  },
  {
    name: "Q",
    suit: "♥️",
    rank: 12,
  },
  {
    name: "K",
    suit: "♥️",
    rank: 13,
  },
  {
    name: "A",
    suit: "♦️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♦️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♦️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♦️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♦️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♦️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♦️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♦️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♦️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♦️",
    rank: 10,
  },
  {
    name: "J",
    suit: "♦️",
    rank: 11,
  },
  {
    name: "Q",
    suit: "♦️",
    rank: 12,
  },
  {
    name: "K",
    suit: "♦️",
    rank: 13,
  },
  {
    name: "A",
    suit: "♣️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♣️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♣️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♣️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♣️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♣️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♣️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♣️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♣️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♣️",
    rank: 10,
  },
  {
    name: "J",
    suit: "♣️",
    rank: 11,
  },
  {
    name: "Q",
    suit: "♣️",
    rank: 12,
  },
  {
    name: "K",
    suit: "♣️",
    rank: 13,
  },
  {
    name: "A",
    suit: "♠️",
    rank: 1,
  },
  {
    name: "2",
    suit: "♠️",
    rank: 2,
  },
  {
    name: "3",
    suit: "♠️",
    rank: 3,
  },
  {
    name: "4",
    suit: "♠️",
    rank: 4,
  },
  {
    name: "5",
    suit: "♠️",
    rank: 5,
  },
  {
    name: "6",
    suit: "♠️",
    rank: 6,
  },
  {
    name: "7",
    suit: "♠️",
    rank: 7,
  },
  {
    name: "8",
    suit: "♠️",
    rank: 8,
  },
  {
    name: "9",
    suit: "♠️",
    rank: 9,
  },
  {
    name: "10",
    suit: "♠️",
    rank: 10,
  },
  {
    name: "J",
    suit: "♠️",
    rank: 11,
  },
  {
    name: "Q",
    suit: "♠️",
    rank: 12,
  },
  {
    name: "K",
    suit: "♠️",
    rank: 13,
  },
];
