//Cache jquery selections
var $guessFlags = $('img.guessFlag');
var $countryName = $('#countryName');

//Starts a new round of the game
function newRound(){
    //Get random country ids for button labels
    var ids = genRandomIds();

    //Generate new correct country, update flag image
    correctBtn = Math.floor(Math.random()*NUM_BUTTONS);
    correctId = ids[correctBtn];
    $countryName.text(countries[correctId].name);

    //Update button labels
    for (var i = 0; i < $guessFlags.length; i++){
        $guessFlags.eq(i).attr('src', COMMON_PATH + countries[ids[i]].path + "&width=" + Math.round(window.innerWidth * 0.16));
    }
    
    //Reset button appearances
    $guessBtns
        .css({
            'background-color': '',
            'color': ''})
        .attr('disabled', false);
}