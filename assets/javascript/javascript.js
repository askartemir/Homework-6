// have document ready at startup
$(document).ready(function(){
// start with an array for GIF topics
	var topics = ["Sprinting", "Wrestling", "Swimming", "Scientist", "Reading"];
	// functions for controlling and generating GIFs
	function showGIFbuttons(){
		// clearing results to start off with a clean slate
		$(".gifButtons").empty();
		for(var j = 0; j < topics.length; j++){
			// create variable for GIF button by linking the jQuery selector for button element to it
			var gButton = $("<button>");
			gButton.addClass("action"); //add action class to button
			gButton.addClass("btn btn-success"); //make button green via Bootstrap
			gButton.attr("data-name", topics[j]); //add attributes each button
			gButton.text(topics[j]); //write the label for each button based on category from the array
			$(".gifButtons").append(gButton); //append the button to the section of HTML for GIF buttons
		}
	}
	function addButton(){
		$("#gif-input").on("click", function(){
			var topic = $("#action-input").val().trim(); //link the value without whitespace from action input jQuery selector to new variable called topic
			if(topic == ""){  //if no input, then do...
				return false;   //function returns boolean value of false, which prevents empty buttons being formed
			}
			topics.push(topic);

			showGIFbuttons();

			return false;
		});
	}
	function removeButton(){
		$("#gif-remove").on("click", function(){
			topics.pop(topic);
			showGIFbuttons();
			return false;
		});
	}
	function showGifs(){
		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response){
			console.log(response);
			$("#gifs").empty();
			var results = response.data;
			if(results == ""){
				alert("Search produced no results");
			}
			for(var j=0; j < results.length; j++){
				var gifDiv = $("<div>");
				gifDiv.addClass("gifDiv");
				var gifRating = $("<p>").text("Rating: " + results[j].rating);
				gifDiv.append(gifRating);
				//obtaining the actual GIF
				var gifImage = $("<img>");
				gifImage.attr("src", results[j].images.fixed_height_small_still.url);
				gifImage.attr("data-still", results[j].images.fixed_height_small_still.url);
				gifImage.attr("data-animate", results[j].images.fixed_height_small.url);
				gifImage.attr("data-state", "still");
				gifImage.addClass("image");
				gifDiv.append(gifImage);

				$("#gifs").prepend(gifDiv);
			}
		});
	}

	showGIFbuttons();
	addButton();
	removeButton();
	

	$(document).on("click", ".action", showGifs);
	$(document).on("click", ".image", function(){
		var state = $(this).attr("data-state");
		if (state == "still"){
			$(this).attr("src", $(this).data("animate"));
			$(this).attr("data-state", "animate");
		}
		else{
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}
	});
});