
function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
  
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
	// this/e.target is current target element.
//console.log("drop "+e);
	var thisDomElemId = this.id,
		sourceDomElemId = dragSrcEl.id,
		thisPaillasseElem = game.paillasseElems[thisDomElemId],
		sourcePaillasseElem = game.paillasseElems[sourceDomElemId]; //game est une variable globale...
		

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same element we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    
    var message = 'handleDrop, this is : '+this.id+' from '+dragSrcEl.id;
    /*
    for (property in this){
		if ((typeof property != 'function')&& (typeof this.property != 'undefined')){ //
			message = message+" ... "+property+":"+this.property;
		}
	}
	*/
	thisPaillasseElem.receive(sourceDomElemId);
	
    console.log(message);
  }

  return false;
	
	
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  /*
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
  * */
}



function makeDragable(el) {
    el.addEventListener('dragstart', handleDragStart, false);
  el.addEventListener('dragenter', handleDragEnter, false)
  el.addEventListener('dragover', handleDragOver, false);
  el.addEventListener('dragleave', handleDragLeave, false);
  el.addEventListener('drop', handleDrop, false);
  el.addEventListener('dragend', handleDragEnd, false);
}





