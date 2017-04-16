//Javascript assignment to add images from user inputed urls to a planning area
//This is the .js file for the behaviour of this project

//Checks if a url is valid,if so, adds it to the planning area
function addImage(url){
	//check if url is valid
	var pattern = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
	console.log("Valid Url: " + url.match(pattern));
	//Add the image
	var elem = document.createElement("img");
	//check if image loaded
	elem.onload = function () {
		console.log("image is loaded in addImage(url)");
		//Add image source
		elem.src = url;
		//Get the height and Width of the image
		var height = parseInt(elem.height);
		var width = parseInt(elem.width);
		console.log("height: " + height);
		console.log("widht: " + width);
		//Set height to 100 if greater than 100
		if(height > 100){
			console.log("greater");
			elem.setAttribute("height", "100");
		}
		//Set width to 100 if greater than 100
		if(width > 100){
			elem.setAttribute("width", "100");
		}
		//Set alt text and set image id as url
		elem.setAttribute("alt", "planning");
		elem.setAttribute("id", url);
		//append the image to the planning area
		$("planning-area").appendChild(elem);
	}
	
}

//Checks if image with given url is on the planning area, 
//if so deletes it from the planning area
function deleteImage(){
	
}

function imageClick(){
	$("input-url").innerHTML = this.id;
}

window.onload=function(){
	$("add").addEventListener('click', function(){
		addImage($("input-url").value);
	});
	$("delete").onclick = deleteImage;
	
	//add the onClick method to all the children of planning-area
	var noImages = document.getElementById("planning-area").childNodes.length;
	var images = document.getElementById("planning-area").childNodes;
	for(var i = 0; i < noImages; i++){
		images[i].onclick = imageClick;
	}
}

