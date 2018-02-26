
var MatchGame = {};

/* ==================================================================
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

/* ==================================================================
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

/* ==================================================================
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.data('card', 0);
  var color =  [25,55,90,160,220,265,310,360];
  $game.empty();
  for(var n = 0; n < cardValues.length; n++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data({ // initial values
        'value': cardValues[n],
        'flipped': false,
        'color': 'hsl(' + color[cardValues[n]-1] + ', 85%, 65%)'
      });
    $game.append($card);
  }

  // card clicked event listener
  $('.card').click(function() { // listen on all Cards
    MatchGame.flipCard($(this), $game);  // act only on this one
  });
};

/* ==================================================================
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

// This routine runs when a card gets clicked...
MatchGame.flipCard = function($card, $game) {
  if( $card.data('flipped') === true ) { // if already flipped
    return; //do nothing
  }

  $card.data('flipped', true); // flipped = true
  $card.text($card.data('value'));
  $card.css(  // update appearance
    'background-color',
    $card.data('color')  // flipped color
  );
  $card.css(
    'color',
    'rgb(256,256,256)'
  )

  if( $game.data('card') === 0) { // if no other cards flipped
    $game.data('card', $card); // add card to flipped array
    return; // do nothing
  }

  var $card2 = $game.data('card'); // handy handle
  $game.data('card', 0);

  // If two flipped cards match
  if( $card.data('value') === $card2.data('value')) { // same value
    window.setTimeout(function() { // other flipped card value different
      $card.css(  // update appearance
        'background-color',
        'rgb(153,153,153)'  // matched bg color
      );
      $card.css(
        'color',
        'rgb(204,204,204)' // matched fg color
      );
      $card2.css(  // update appearance
        'background-color',
        'rgb(153,153,153)'  // matched bg color
      );
      $card2.css(
        'color',
        'rgb(204,204,204)' // matched fg color
      );
    }, 300)
  // If two flipped cards don't match
  } else {
    window.setTimeout(function() { // other flipped card value different
      $card.css(  // update appearance
        'background-color',
        'rgb(32,64,86)'  // unflipped bg color
      );
      $card.text('');
      $card.data('flipped', false);
      $card2.css(  // update appearance
        'background-color',
        'rgb(32,64,86)'  // unflipped bg color
      );
      $card2.text('');
      $card2.data('flipped', false);
    }, 400);
  }

};

/*
Possible improvements:
See spec for anything missing from requirements.
Time delay (1/2 second) to transition matched cards to grey.
Reset button (instead of browser refresh).
Score function.
Sound. No, actually not this.

*/
