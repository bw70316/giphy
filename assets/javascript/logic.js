

var cartoons = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Foghorn Leghorn", "Porky Pig", "Taz", "Sylvester the Cat", "Pepe le Pew", "Marvin the Martian", "Wile E. Coyote", "Speedy Gonzales", "Lola Bunny"];

// created an array for my inital buttons

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < cartoons.length; i++)  {
// this loops through my array of cartoons

  var a = $("<button>"); // this is a jquery function to create a button

  a.addClass("cartoon"); // this is a created class for the buttons to be displayed too

  a.attr("data-cartoon", cartoons[i] + " looney tunes"); // this adds the data from the API from giphy. I added " looney tunes" to attempt to weed out potential non-animated gifs. 

  a.text(cartoons[i]); // this provides the inital button text from the array

  $("#buttons-view").append(a); // this adds the buttons to the div from my html

        }

   
   }

   //this function renders buttons from my array above.
 renderButtons();
 //this calls the function to operate upon the load. 


   $("#add-cartoon").on("click", function(event) {
       
        event.preventDefault(); //prevent the defult behavior of submitting a form
  
        var cartoon = $("#cartoon-input").val();

        cartoons.push(cartoon);
        console.log(cartoons);

      
        renderButtons(); // this funs the renderbuttons function from above 

      });

   //this function renders the text from the input form into a button to be displayed in the "buttons view" div

 $(document).on("click", ".cartoon", displayCartoon); // when the buttons are click it runs the displayCartoon function below

function displayCartoon() {

  var cartoon = $(this).attr("data-cartoon");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        cartoon + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }) // gets the API key which is listed above from giphy and includes my array cartoon in the queryURL

  .done(function(response){

      var results = response.data; //create a variable of the results from the giphy api data. 


// the for loop below loops through the results from the API
      for (var i = 0; i < results.length; i++){
 
      var animate = results[i].images.fixed_height.url; // got this from the object. It is the animation url. 

      var still = results[i].images.fixed_height_still.url;// "" "". It is from the images url but only the still url not animated

      var gifDiv = $("<div class='item'>"); // creates a div to hold the gifs

      var rating = results[i].rating; // this is grabbing the ratings, a term in the giphy api

      var p = $("<p>").text("Rating: " + rating); // creates an element to hold 

      var cartoonImage = $("<img>");// creates and stores an img tag

       ;
       gifDiv.append(p);
        gifDiv.append(cartoonImage);
$("#cartoons-view").append(gifDiv);
// this appends the gifs and rating in the same div that was created above to hold the images. 



 

      cartoonImage.attr({"animate": animate, "still": still, "src": animate, state: "still"});

      // the above uses the variables assigned above from the images objects. So the src for the image is animated url while the state refers to the state of the data on click after the function is run.  

 $(cartoonImage).on("click", function() {

  var state = $(this).attr("state");


  if (state === "still") {

    $(this).attr("src", $(this).attr("animate"));
    $(this).attr("state", "animate");}

    else {
      $(this).attr("src", $(this).attr("still"));
      $(this).attr("state", "still");}

        
    });
  }
  //for the if statement, if the state is still on click then get "this" button click data from the 
  //src for the animated. 
  //else, meaning it is already active, get the specific data for this button clicked on but for the still url. 

$(".cartoon").on("click", function() {

        $("#cartoons-view").empty();});

// the above function clears the images from the div where they are displayed on another button click. 

console.log(response); // i'm leaving this in here because it is what I used to find the images url for still and active

    renderButtons();

});

  }









     

        