
var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

MatchGame.deal = function() {
  var $game = $('#game'); /* Select parent of .card array */
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
}

$(document).ready(function() {
MatchGame.deal();
});

/*
  Generates and returns an array of matching card values.
  https://jsfiddle.net/MarkSeagoe/8ev0v6oe/
*/

MatchGame.generateCardValues = function () {
  var ordered = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
  var random = [];
  var asize = 16;
  var index = 0;
  while(asize > 0) {
    index = Math.floor(Math.random() * asize);
    random.push(ordered[index]);
    ordered.splice(index,1)
    asize = ordered.length;
  }
  return random;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var color =  [25,55,90,160,220,265,310,360];
  // $game.children('.card').remove();
  $game.empty();
  var arr = cardValues;
  var m = cardValues.length; // debug - Math.floor(Math.random() * cardValues.length);
  for(var n = 0; n < m; n++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data = {
        'value': cardValues[n],
        'flipped': false,
        'color': 'hsl(' + color[cardValues[n]] + ', 85%, 65%)'
      };
    $game.append($card);
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};

/*
Improvements:

Time delay (1/2 second) to transition matched cards to grey.
Reset button (instead of browser refresh).
Score function.
Sound. No, actually not this.

*/
