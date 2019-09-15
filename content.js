// Replace images

// Seahorse object to construct replacement images
function Seahorse(ratio, imageurl) {
  this.ratio = ratio;
  this.imageurl = imageurl;
}

// Determine image ratio
function imageRatio(image) {
  var proportion = image.height / image.width;

  if (proportion > 1) {
    return "vertical";
  } else if (proportion === 1) {
    return "square";
  } else if (proportion < 1) {
    return "horizontal";
  }
}

// library of replacement images
var imageLibrary = [
  new Seahorse("vertical", "https://i.imgur.com/CkosoIh.png"),
  new Seahorse("square", "https://i.imgur.com/GBL6nAa.png"),
  new Seahorse("horizontal", "https://i.imgur.com/PqrrQlZ.png")
];

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
    console.log("horizontal image found!");
    return this.imageLibrary[2];
  }
};

// the image replacement magic
(function(document) {
  getSeahorse.init(imageLibrary);

  // find what to replace on the page
  var images = document.getElementsByTagName("img"),
    length = images.length;

  // replace images
  for (var i = 0; i < length; i++) {
    var ratio = imageRatio(images[i]);
    console.log(getSeahorse[ratio]());
    var img = getSeahorse[ratio]();
    images[i].src = img.imageurl;
  }

  // Github's profile picture is not constrained by dimensions
  try {
	var githubSearch = document.getElementsByClassName("mr-2 header-search-key-slash");
	for (let pic of githubSearch) {
		pic.setAttribute("src", "https://github.githubassets.com/images/search-key-slash.svg");
	}
  } catch(error) {
	console.log("we are not on Github");
  }
})(document);

// array of everything
var elementsInsideBody = [...document.body.getElementsByTagName("*")];

// loop
function findAndReplace() {
  elementsInsideBody.forEach(element => {
    element.childNodes.forEach(child => {
      if (child.nodeType === 3) {
        replaceText(child);
      }
    });
  });
}

function replaceText(node) {
  let value = node.nodeValue;
  value = value.replace(/She /g, "He/She  ");
  value = value.replace(/He /g, "He/She ");
  value = value.replace(/she /g, "he/she ");
  value = value.replace(/he /g, "he/she  ");
  node.nodeValue = value;
}

window.onload = findAndReplace();