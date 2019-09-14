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
var $flagImage = $('#flagImage');
var $resetBtn = $('button#resetBtn');

//Global vars
var correctId;
var correctBtn;

//Starts a new round of the game
function newRound(){
    //Get random country ids for button labels
    var ids = genRandomIds();

    //Generate new correct country, update flag image
    correctBtn = Math.floor(Math.random()*NUM_BUTTONS);
    correctId = ids[correctBtn];
    $flagImage.attr('src', COMMON_PATH + countries[correctId].path + "&width=" + Math.round(window.innerWidth * .45));

    //Update button labels
    for (var i = 0; i < $guessBtns.length; i++){
        $guessBtns.eq(i).text(countries[ids[i]].name);
    }
    
    //Reset button appearances
    $guessBtns
        .css({
            'background-color': '',
            'color': ''})
        .attr('disabled', false);
}

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

function bindEvents(){
    for (var i = 0; i < $guessBtns.length; i++){
        $guessBtns.eq(i).on('click', {btnIndex: i}, processGuess);
    }

    $resetBtn.on('click', newRound);
}

function genRandomIds(){
    var idsSet = new Set();

    while (idsSet.size < $guessBtns.length)
        idsSet.add(Math.floor(Math.random()*countries.length));

    return Array.from(idsSet);
}