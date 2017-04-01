

var cartoons = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Scooby Doo", "Porky Pig", "Peter Griffin", "Stewie Griffin", "Pikachu", "Homer Simpson", "Samurai Jack", "Ninja Turtles", "Tweety Bird", "Shaq"];
var cartoonImage = "";

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
 renderButtons();


   $("#add-cartoon").on("click", function(event) {
       
        event.preventDefault();
  
        var cartoon = $("#cartoon-input").val();

        cartoons.push(cartoon);
        console.log(cartoons);

      
        renderButtons();

      });

 $(document).on("click", ".cartoon", displayCartoon);

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
 
      var active = results[i].images.fixed_height.url;

      var still = results[i].images.fixed_height_still.url;

      var gifDiv = $("<div class='item'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var cartoonImage = $("<img>");

       cartoonImage.attr("src", results[i].images.fixed_height.url);
       gifDiv.append(p);
        gifDiv.append(cartoonImage);
$("#cartoons-view").append(gifDiv);

 //delete starting here to get working

 $(document).on("click", ".cartoon", displayCartoon);

      cartoonImage.attr({"active":active, "still":still, "src":active, "state":"still"});

 $(cartoonImage).on("click", function() {

  var state = $(this).attr("state");
  var source = $(this).attr("src");

  if (state === "still") {

    $(this).attr("src", $(this).attr("active"));
    $(this).attr("state", "active");}

    else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("state", "still");}

        
    });
  }

//end delete here to get working



console.log(response);

    

});

  }









     

        renderButtons();