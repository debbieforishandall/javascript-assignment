//Javascript assignment to add images from user inputed urls to a planning area
//This is the .js file for the behaviour of this project

//Checks if a url is valid,if so, adds it to the planning area
function addImage(url){
	clearError();
	//check if url is valid
	var pattern = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
	console.log("Valid Url: " + url.match(pattern)[0]);
	//Add the image
	var elem = document.createElement("img");
	var height = 0;
	var width = 0;
	//check if image loaded
	elem.onload = function () {
		console.log("image is loaded in addImage(url)");
		height = parseInt(elem.height);
		width = parseInt(elem.width);
		//Get the height and Width of the image
		console.log("height: " + height);
		console.log("widht: " + width);
	}
	//Add image source
	elem.src = url;
	
	//testing something
	console.log("elem.height" + elem.height);
	console.log("elem.width" + elem.width);
	
	
	//TODO: fix this height and width
	elem.setAttribute("height", "100");
	elem.setAttribute("width", "100");
	//Set height to 100 if greater than 100
	/*if(height > 100){
		console.log("greater");
		elem.setAttribute("height", "100");
	}
	//Set width to 100 if greater than 100
	if(width > 100){
		elem.setAttribute("width", "100");
	} */
	//Set alt text and set image id as url
	elem.setAttribute("alt", "planning");
	elem.setAttribute("id", url);
	//elem.setAttribute("onclick", imageClick);
	elem.onclick = imageClick;
	elem.onfocus = zoomPicture;
	//append the image to the planning area
	$("planning-area").appendChild(elem);
	
}

//Checks if image with given url is on the planning area, 
//if so deletes it from the planning area
function deleteImage(url){
	clearError();
	//check if url is valid
	//check  if url is on planning area
	if($(url)){
		//TODO: delete the object
		clear: function(element) {
        element = $(url);
		Event.stopObserving(element);
		return element.update();
	}
	else{
		//add an error to the error text
		$("error").innerHTML = "Error image with specified url is not in planning area";
	}
	
}

//Clears the error paragraph
function clearError(){
	//Set error text to empty
	$("error").innerHTML = "";
}

//Handles clicks on image
function imageClick(){
	$("input-url").innerHTML = this.id;
}

//Zooms focused picture
function zoomPicture(){
	//Get original width
	var origHeight = this.naturalHeight;
	var origWidth = this.naturalWidth;
	if(origHeight > 500 &&  origWidth > 500){
		this.height = 500;
		this.width = 500;
	} else{
		this.height = origHeight;
		this.width = origWidth;
	}	
}

window.onload=function(){
	$("add").addEventListener('click', function(){
		addImage($("input-url").value);
	});
	$("delete").addEventListener('click', function(){
		deleteImage($("input-url").value);
	});
	//On input into the input-url element, clear errors
	$("input-url").onchange = clearError;
	
	
	//add the onClick method to all the children of planning-area
	//var noImages = document.getElementById("planning-area").childNodes.length;
	//var images = document.getElementById("planning-area").childNodes;
	//for(var i = 0; i < noImages; i++){
	//	images[i].onclick = imageClick;
	//}
}

