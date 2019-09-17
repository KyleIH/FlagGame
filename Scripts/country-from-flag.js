//Cache jquery selection
var $flagImage = $('#flagImage');

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