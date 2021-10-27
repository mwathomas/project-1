//DEPENDENCIES
//targets the button the users presses to enter their name at the top of the page
var getNameInputBtn = document.getElementById("button-addon2");

//DATA
//need to store name of current user after they enter it in getNameInput event listenter
var currentUserName = "";

//FUNCTIONS
//uses the name the user entered to display a message unique to the current user
function welcomeUser() {
  //variable to target span to add user's name to
  var $welcomeUserMessageTarget = $("#user-name"); //document.getElementById("user-name");
  $welcomeUserMessageTarget.text(
    "Hello, " + currentUserName + "! Welcome to FoodE!"
  );
  askUserForIngredients();
}

//displays a custom message to the user asking which ingredients theyd like to add
function askUserForIngredients() {
  //variable to target span to add user's name to
  var $askUserIngredientsTarget = $("#ask-user-ingredients"); //document.getElementById("user-name");
  console.log($askUserIngredientsTarget.val());
  $askUserIngredientsTarget.text(
    "What ingredients will you be cooking with today, " + currentUserName
  );
}

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
  //call a function that adds the users name to the <span> in the header welcoming them
  welcomeUser();
});
