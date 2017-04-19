//Javascript assignment to add images from user inputed urls to a planning area
//This is the .js file for the behaviour of this project

//Checks if a url is valid,if so, adds it to the planning area
function addImage(url){
	clearError();
	//check if url is valid
	if(isValidUrl(url) ){
		//Add the image
		var elem = document.createElement("img");
		var height = 0;
		var width = 0;
		//check if image loaded
		elem.onload = function () {
			console.log("image is loaded in addImage(url)");
			height = parseInt(elem.naturalHeight);
			width = parseInt(elem.naturalWidth);
			//Get the height and Width of the image
			console.log("height: " + height);
			console.log("widht: " + width);	
			//Add mouse eneter and mouse leave functions
			elem.addEventListener('mouseenter', zoomPicture);
			elem.addEventListener('mouseleave', zoomOut);
		}
		//Add image source
		elem.src = url;
		
		//TODO: remove this temp fix
		elem.setAttribute("height", "100");
		elem.setAttribute("width", "100");
		
		//Set height to 100 if greater than 100
		if(height > 100){
			console.log("greater");
			elem.setAttribute("height", "100");
		} else{
			elem.setAttribute("height", height);
		}
		//Set width to 100 if greater than 100
		if(width > 100){
			elem.setAttribute("width", "100");
		} else {
			elem.setAttribute("width", width);
		}
		//Set alt text and set image id as url
		elem.setAttribute("alt", "planning image");
		elem.setAttribute("id", url);
		elem.addEventListener('click', imageClick);
		
		//append the image to the planning area
		$("planning-area").appendChild(elem);
	} else {
		//add an error to the error text
		$("error").innerHTML = "Error url invalid";
	}
	
}

//Checks if image with given url is on the planning area, 
//if so deletes it from the planning area
function deleteImage(url){
	clearError();
	//check if url is valid
	if(isValidUrl(url)){
		//check  if url is on planning area
		if($(url)){
			//TODO: delete the object
			var elem = $(url).remove();
		}
		else{
			//add an error to the error text
			$("error").innerHTML = "Error image with specified url is not in planning area";
		}
	} else {
		//add an error to the error text
		$("error").innerHTML = "Error url invalid";
	}
	
	
}

//Clears the error paragraph
function clearError(){
	//Set error text to empty
	$("error").innerHTML = "";
}

//Handles clicks on image
function imageClick(){
	console.log("In imageClick(), id is: " + this.id);
	$("input-url").value = this.id;
}

function isValidUrl(url){
	//TODO: fix this
	var pattern = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
	console.log("Valid Url: " + url.match(pattern));
	return true;
}

//Zooms focused picture
function zoomPicture(){
	console.log("In zoomPicture");
	//Get original width
	var origHeight = this.naturalHeight;
	var origWidth = this.naturalWidth;
	console.log("In zoomPicture, origHeight: " + origHeight);
	if(origHeight > 500 &&  origWidth > 500){
		this.height = 500;
		this.width = 500;
	} else{
		this.height = origHeight;
		this.width = origWidth;
	}	
}

function zoomOut(){
	if(this.naturalHeight > 100){
		this.height = 100;
	} else {
		this.height = this.naturalHeight;
	}
	if(this.naturalwidth < 100){
		this.width = 100;
	} else {
		this.width = this.naturalWidth;
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

