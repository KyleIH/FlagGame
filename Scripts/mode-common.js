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
var $scoreStreak = $('h2#scoreStreak');
var $scorePercent = $('h2#scorePercent');

//Global vars
var correctId;
var correctBtn;
var currStreak = 0;
var numAttempts = 0;
var numCorrect = 0;
var roundAlreadyFailed = false;

//Processes a guess event from a button click
function processGuess(event){
    if (event.data.btnIndex === correctBtn){
        $guessBtns.attr('disabled', true);
        $guessBtns.eq(event.data.btnIndex)
            .css({
                'background-color': '#BFFFBF',
                'color': 'buttontext'});

        //Update scores if haven't already
        if (!roundAlreadyFailed) {
            numAttempts++;
            numCorrect++;
            currStreak++;
            updateScoreLabels();
        }

        //Enable new round button
        $resetBtn.attr('disabled', false);
    }
    else {
        $guessBtns.eq(event.data.btnIndex)
        .css('background-color', '#FFBFBF')
        .attr('disabled', true);

        //Update scores if haven't already
        if (!roundAlreadyFailed) {
            numAttempts++;
            currStreak = 0;
            roundAlreadyFailed = true;
            updateScoreLabels();
        }
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

//Updates the text in the score labels
function updateScoreLabels(){
    $scoreStreak.text(currStreak);
    $scorePercent.text(Math.round(numCorrect * 100.0 / numAttempts) + "%");
}