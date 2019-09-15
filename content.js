// import "github-tweak"
// import "linkedin-tweak"


(function() {
    document.addEventListener("DOMContentLoaded", format_page)
    console.log("here")
})


function format_page() {
    console.log("ayy")
}

// function get_current_tab() {
//     return chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//         return tabs[0].url;
//     });
// }

// function delegate_tweaks(url) {
//     if (url.includes("github")){

//     }

//     else if (url.includes("linkedin")){

//     }

//     else {
//         break
//     }
// }

// function inject_js()

// Replace images

// Seahorse object to construct replacement images
function Seahorse(ratio, imageurl) {
	this.ratio = ratio;
	this.imageurl = imageurl;
}

// Determine image ratio
function imageRatio(image) {
	var proportion = image.height/image.width;

	if (proportion > 1) {
		return "vertical";
	} else if (proportion === 1) {
		return "square";
	} else if (proportion < 1) {
		return "horizontal"
	}
}

// library of replacement images
var imageLibrary = [
new Seahorse("vertical", "https://i.imgur.com/CkosoIh.png"),
new Seahorse("square", "https://i.imgur.com/GBL6nAa.png"),
new Seahorse("horizontal", "https://i.imgur.com/PqrrQlZ.png")
]

// get the correct image for the image ratio
var getSeahorse = {
	init: function(imageLibrary) {
		this.imageLibrary = imageLibrary;
	},

	vertical: function() {
		return this.imageLibrary[0];
	},

	square: function() {
		return this.imageLibrary[1];
	},

	horizontal: function() {
		console.log("horizontal image found!")
		return this.imageLibrary[2];
	}
};

function Randomize(images){
    return Math.floor(Math.random() * images.length)
 }

// the image replacement magic
(function (document) {
	getSeahorse.init(imageLibrary);

	// find what to replace on the page
	var images = document.getElementsByTagName('img'), length = images.length;

	// replace images
	for (var i = 0; i < length; i++) {
		var ratio = imageRatio(images[i]);
		console.log(getSeahorse[ratio]())
		// var number = Randomize(getSeahorse[ratio]());	
		var img = getSeahorse[ratio]();	
		images[i].src = img.imageurl;
	}
})(document);
