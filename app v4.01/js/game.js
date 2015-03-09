
var game = {
    
    paillasseElems: {},


    handleKeypress: function (e) {
        e = e || window.event; // IE
        var unicode=e.charCode? e.charCode : e.keyCode
		var actualkey=String.fromCharCode(unicode)
        switch(actualkey){
			case 'a' : 
				console.log('pressed a');
				break;
			case 'r' :
				(function(){
					for(var i = 0, l = paillasseElems.length; i < l; ++i){
						
					}
				})();		
				break;

			
		}
        
    },

    addPaillasseElem: function (paillasseElem) {
        var id = paillasseElem.id;
        this.paillasseElems[id] = paillasseElem;
    },
    handlePositionChanged: function (paillasseElem) {
        var i, 
            paillasseElems = this.paillasseElems,
            positions = {};
        
        for (i in paillasseElems) {
            if (paillasseElems.hasOwnProperty(i)) {
                positions[paillasseElems[i].id] = paillasseElems[i].receivedDomId;
            }
        }
        this.fire('positionChanged', positions);
        console.log('game : handleDroped has just fire "positionChanged"');
    }
};

