//DEPENDENCIES

//targets the button the users presses to enter their name at the top of the page
var getNameInputBtn = document.getElementById("button-addon2");

//DATA
//need to store name of current user after they enter it in getNameInput event listenter
var currentUserName = "";

//FUNCTIONS

//USER INTERACTIONS
//TODO: save the users input when they are prompted at the very start of the page
getNameInputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  //TODO: write code so that when user presses button to submit their name, if something has been entered in the input area, we need to save the name and display it to the span where the text is like "Hello ____! Welcome to Foode!"
  //targets the <input> for the user
  var $userNameInput = $("#name-input");
  currentUserName = $userNameInput.val();

  //checks to make sure there was something in input area when submit button is pressed
  if (currentUserName === "") {
    alert(
      "ERROR: NO NAME ENTERED -- PLEASE ADD NAME BEFORE ADDING INGREDIENTS"
    );
    return;
  }
});
