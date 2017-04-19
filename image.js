//Javascript assignment to add images from user inputed urls to a planning area
//This is the .js file for the behaviour of this project

 /*jslint devel: true */
 /*jshint smarttabs:true */
 /*jslint white: true */
 /*global $ */
 /*jslint browser: true*/
 /*global window*/
 /*jslint this: true */
 /*jslint for: true */
 
//Clears the error paragraph
function clearError() {
	"use strict";
	//Set error text to empty
	$("error").innerHTML = "";
}

//Handles clicks on image
function imageClick() {
	"use strict";
	console.log("In imageClick(), id is: " + this.id);
	$("input-url").value = this.id;
}

//Checks if url is valid
function isValidUrl(url) {
	"use strict";
	//fix this
	//var pattern = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
	//Copyright (c) 2010-2013 Diego Perini (http://www.iport.it)
	var pattern = new RegExp(
	  "^" +
		// protocol identifier
		"(?:(?:https?|ftp)://)" +
		// user:pass authentication
		"(?:\\S+(?::\\S*)?@)?" +
		"(?:" +
		  // IP address exclusion
		  // private & local networks
		  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
		  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
		  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
		  // IP address dotted notation octets
		  // excludes loopback network 0.0.0.0
		  // excludes reserved space >= 224.0.0.0
		  // excludes network & broacast addresses
		  // (first & last IP address of each class)
		  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
		  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
		  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
		"|" +
		  // host name
		  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
		  // domain name
		  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
		  // TLD identifier
		  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
		  // TLD may end with dot
		  "\\.?" +
		")" +
		// port number
		"(?::\\d{2,5})?" +
		// resource path
		"(?:[/?#]\\S*)?" +
	  "$", "i"
	);
	console.log("Valid Url: " + pattern.test(url));
	return pattern.test(url);
}

//Zooms focused picture
function zoomPicture() {
	"use strict";
	//console.log("In zoomPicture");
	//Get original width
	var origHeight = parseInt(this.naturalHeight);
	var origWidth = parseInt(this.naturalWidth);
	console.log("In zoomPicture, origHeight: " + origHeight);
	console.log("In zoomPicture, origWidth: " + origWidth);
	if(origHeight > 500 && origWidth > 500){
		this.height = 500;
		this.width = 500;
		console.log("in zoomPicture(), height is set to: " + this.height);
		console.log("in zoomPicture(), width is set to: " + this.width);
	} else{
		this.height = origHeight;
		this.width = origWidth;
		console.log("in zoomPicture(), width is set to: " + this.width);
	}	
}

//zooms out of unfocused picture
function zoomOut() {
	"use strict";
	console.log("In zoomOut, naturalWidth: " + this.naturalWidth);
	if(parseInt(this.naturalWidth) > 100){
		this.width = 100;
		console.log("in zoomOut(), greater , width is set to: " + this.width);
	} else {
		this.width = parseInt(this.naturalWidth);
		console.log("in zoomOut(), width is set to: " + this.width);
	}
	if(parseInt(this.naturalHeight) > 100){
		this.height = 100;
	} else {
		this.height = parseInt(this.naturalHeight);
	}
}

//checks if picture is already in planning area
function notDuplicate(url) {
	"use strict";
	var noImages = document.getElementById("planning-area").childNodes.length;
	var i = 0;
	for(i = 0; i < noImages; i+=1) {
		if($(url)){
			return false;
		}
	}
	return true;
}

//Checks if a url is valid,if so, adds it to the planning area
function addImage(url) {
	"use strict";
	clearError();
	//console.log("in addImage isValidUrl(url) is: " + isValidUrl(url));
	//check if url is valid and not duplicate of image already in planning area
	if(isValidUrl(url) && notDuplicate(url)) {
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
			console.log("width: " + width);
			
			//Set width to 100 if greater than 100
			if(width > 100) {
				console.log("greater Width");
				elem.setAttribute("width", "100");
			} else {
				elem.setAttribute("width", width);
			}
			
			//Set height to 100 if greater than 100
			if(height > 100) {
				console.log("greater");
				elem.setAttribute("height", "100");
			} else {
				console.log("less");
				elem.setAttribute("height", height);
			}
			
		
			//Add mouse eneter and mouse leave functions
			elem.addEventListener("mouseover", zoomPicture);
			elem.addEventListener("mouseout", zoomOut);			
		};
		//Add image source
		elem.src = url;
		
		//Set alt text and set image id as url
		elem.setAttribute("alt", "planning image");
		elem.setAttribute("id", url);
		elem.addEventListener("click", imageClick);
		
		//append the image to the planning area
		$("planning-area").appendChild(elem);
	} else {
		//add an error to the error text
		$("error").innerHTML = "Error url invalid or already in planning area";
	}
	
}

//Checks if image with given url is on the planning area, 
//if so deletes it from the planning area
function deleteImage(url) {
	"use strict";
	clearError();
	//check if url is valid
	if(isValidUrl(url)) {
		//check  if url is on planning area
		if($(url)) {
			//delete the object
			$(url).remove();
		}
		else {
			//add an error to the error text
			$("error").innerHTML = "Error image with specified url is not in planning area";
		}
	} else {
		//add an error to the error text
		$("error").innerHTML = "Error url invalid";
	}
	
	
}

//window load function
window.onload=function () {
	"use strict";
	$("add").addEventListener("click", function () {
		addImage($("input-url").value);
	});
	$("delete").addEventListener("click", function () {
		deleteImage($("input-url").value);
	});
	//On input into the input-url element, clear errors
	$("input-url").onkeyup = clearError;
	
	//add the onClick method to all the children of planning-area
	//var noImages = document.getElementById("planning-area").childNodes.length;
	//var images = document.getElementById("planning-area").childNodes;
	//for(var i = 0; i < noImages; i++){
	//	images[i].onclick = imageClick;
	//}
	
};

