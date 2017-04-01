

var cartoons = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Scooby Doo", "Porky Pig", "Peter Griffin", "Stewie Griffin", "Pikachu", "Homer Simpson", "Samurai Jack", "Ninja Turtles", "Tweety Bird", "Shaq"];

function displayCartoon() {

  var cartoon = $(this).attr("data-cartoon");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response){

    var results = response.data;

    for (var i = 0; i < results.length; i++){

      if (results[i].rating !== "r"){

        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var cartoonImage = $("<img>");

        cartoonImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.append(cartoonImage);
$("#cartoons-view").append(gifDiv);
console.log(response);





    }
    
    renderButtons();
}

  });


}


function renderButtons() {

	$("#buttons-view").empty();

	for (var i = 0; i < cartoons.length; i++)  {


	var a = $("<button>");

	a.addClass("cartoon");

	a.attr("data-cartoon", cartoons[i]);

	a.text(cartoons[i]);

	$("#buttons-view").append(a);

  }

}

   $("#add-cartoon").on("click", function(event) {
       
        event.preventDefault();
  
        var cartoon = $("#cartoon-input").val();

        cartoons.push(cartoon);
        console.log(cartoons);

      
        renderButtons();

      });

$(".cartoon").on("click", function(event){
   event.preventDefault();

  $("#cartoons-view").hide();
});

      $(document).on("click", ".cartoon", displayCartoon);

        renderButtons();