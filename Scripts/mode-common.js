const COMMON_PATH = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";
const NUM_BUTTONS = 6;

var countries;

//Get country data, bind events and start game when complete
$.getJSON("countries.json", function(data){
    countries = data;
    bindEvents();
    newRound();
});

//Cache jquery selections
var $guessBtns = $('button.guessBtn');
var $resetBtn = $('button#resetBtn');

//Global vars
var correctId;
var correctBtn;

//Processes a guess event from a button click
function processGuess(event){
    if (event.data.btnIndex === correctBtn){
        $guessBtns.attr('disabled', true);
        $guessBtns.eq(event.data.btnIndex)
            .css({
                'background-color': '#BFFFBF',
                'color': 'buttontext'});
    }
    else {
        $guessBtns.eq(event.data.btnIndex)
        .css('background-color', '#FFBFBF')
        .attr('disabled', true);
    }
}

//Binds click events to the guess buttons, and the reset button
function bindEvents(){
    for (var i = 0; i < $guessBtns.length; i++){
        $guessBtns.eq(i).on('click', {btnIndex: i}, processGuess);
    }

    $resetBtn.on('click', newRound);
}

//Generates a unique id for each guess button
function genRandomIds(){
    var idsSet = new Set();

    while (idsSet.size < $guessBtns.length)
        idsSet.add(Math.floor(Math.random()*countries.length));

    return Array.from(idsSet);
}