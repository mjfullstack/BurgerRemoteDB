$(document).ready(function() {

  $("#enter-new-burger-area").on("click", ".submit", function(event) {
    event.preventDefault();
    var newBurger = $("#newBurgerText").val().trim();
    console.log("newBurger: " + newBurger);
    var burgerHost = window.location.host; // didn't need this after all
    var burgerHostHome = "/";
    var frontEndFilesRoute = "/addnew"; // This is what we're using!
    var postDataURL = frontEndFilesRoute + '/'  + newBurger;
    console.log('postDataURL: ' + postDataURL);

    $.ajax({
      url: postDataURL,
      method:"POST",
      data: newBurger,
      success: function(response1) {
        console.log("NEW BURGER 1ST AJAX response1: ", response1);
        // Grabbing whole response wasn't working, so skip second AJAX
        // $.ajax({
        //   url: burgerHostHome,
        //   method:"GET",
        //   success: function(response2) {
        //     console.log("NEW BURGER 2nd AJAX response2: ", response2);
        //   },
        //   error: function(){
        //     alert("NEW BURGER 2ND AJAX response error");
        //   }
        // }); 

        // <p id="p-want-devour-{{id}}">{{burger_name}}<a role="button" class="btn" href="#"><button class="btn btn-success btn-sm submit" data-value={{id}} id="a-want-devour-{{id}}">Devour</button></a></p>
        var newOneToDevour = $("<p>")
          .attr("id", "p-want-devour-" + response1 )
          // .text(newBurger)
          .html(newBurger +'<a role="button" class="btn" href="#"><button class="btn btn-success btn-sm submit" data-value="' + response1 + '" id="a-want-devour-' + response1 + '">Devour</button></a>');
        console.log("newOneToDevour: ", newOneToDevour)
        $("#burgers-to-be-devoured-list-area").append(newOneToDevour);
        $("#newBurgerText").val("");
      },
      error: function(){
        alert("NEW BURGER 1ST AJAX response error");
      }
    }); 
  });


  $("#burgers-to-be-devoured-list-area").on("click", ".submit", function(event) {
    event.preventDefault();
    var burgerDevoured = $(this).data('value'); // and... $(this).attr('id') = " + $(this).attr("id")
    var burgerHost = window.location.host; // didn't need this after all
    var frontEndFilesRoute = "/devoured";
    var postDataURL = frontEndFilesRoute + '/' + burgerDevoured; // This is what we're using!

    var myButton = $(this);
    var myButtonID = $(this).attr("id");
    console.log('myButton: ,',  myButton);
    console.log('myButtonID: ,',  myButtonID);

    var myAhandle = myButton.parent();
    var myAhandleID = myButton.parent().attr("id");
    var myPhandle = myAhandle.parent();
    var myPhandleID = myAhandle.parent().attr("id");


    $.ajax({ // c-r-U-d UPDATE
      url: postDataURL,
      method:"PUT",
      data: burgerDevoured,
      success: function(response) {
        console.log("DEVOUR - response: ", response); // Number
        myAhandle.addClass("devoured");
        myPhandle.addClass("devoured");
        $("#burgers-to-be-devoured-list-area").append(myAhandle);
        $("#burgers-to-be-devoured-list-area").append(myPhandle);
        var myAhandleEaten = myAhandle.removeClass("devoured");
        var myPhandleEaten = myPhandle.removeClass("devoured");
        myAhandle.css("display", "none");;
        // console.log("AJAX Success - myAhandle: ", myAhandle);
        // console.log("AJAX Success - myPhandle: ", myPhandle);
        var devouredThisOne = $("<div>");
        devouredThisOne.append(myPhandleEaten)
        $("#burgers-already-devoured-list-area").append(myPhandleEaten);
        $("#burgers-already-devoured-list-area").append(devouredThisOne);
      },
      error: function(){
        alert("AJAX response error");
      }
    }); 

  });
});
