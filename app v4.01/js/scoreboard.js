var scoreboard = {
    
    //element: document.getElementById('results'),
    
    update: function (score) {
        
        var i, msg = "scoreboard\'s just said that ";
        for (i in score) {
            if (score.hasOwnProperty(i)) {
                msg += i + ' is hosting ' +score[i]+' and ';
            }
        }
        //this.element.innerHTML = msg;
        console.log(msg);
    }
};
