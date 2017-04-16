//Javascript assignment to add images from user inputed urls to a planning area
//This is the .js file for the behaviour of this project

//Checks if a url is valid,if so, adds it to the planning area
function addImage(url){
	//check if url is valid
	var pattern = /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i;
	console.log("Valid Url: " + url.match(pattern));
	//Add the image
	var elem = document.createElement("img");
	elem.src = url;
	elem.setAttribute("alt", "planning");
	elem.setAttribute("id", url);
	$("planning-area").appendChild(elem);
	var height = parseInt(elem.height);
    var width = parseInt(elem.width);
	console.log("height: " + height);
	console.log("widht: " + width);
	if(height > 100){
		console.log("greater");
		elem.setAttribute("height", "100");
	}
	if(width > 100){
		elem.setAttribute("width", "100");
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
	
}

