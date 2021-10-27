//DEPENDENCIES
//targets the button the users presses to enter their name at the top of the page
var getNameInputBtn = document.getElementById("button-addon2");
var getIngredientInputBtn = document.getElementById("submit-ingredient-btn");

//DATA
//need to store name of current user after they enter it in getNameInput event listenter
var currentUserName = "";
//need an array to store the ingredients the users inputs
var ingredientsArr = [];

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
  //make hidden container visible
  displayIngredientAddInputAbility();

  //variable to target span to add user's name to
  var $askUserIngredientsTarget = $("#ask-user-ingredients"); //document.getElementById("user-name");
  $askUserIngredientsTarget.text(
    "What ingredients will you be cooking with today, " + currentUserName
  );
}

//have default visibility for "ingreds-input-container" be hidden, but after user enters their name this container will become visible
function displayIngredientAddInputAbility() {
  var ingredsContainer = document.getElementById("ingreds-input-container");
  ingredsContainer.style.visibility = "visible";
}

//USER INTERACTIONS
//DONE: save the users input when they are prompted at the very start of the page
getNameInputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  //DONE: write code so that when user presses button to submit their name, if something has been entered in the input area, we need to save the name and display it to the span where the text is like "Hello ____! Welcome to Foode!"
  //targets the <input> for the user
  var $userNameInput = $("#name-input");
  currentUserName = $userNameInput.val().trim();

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

//TODO: When the user clicks the 'Add Ingredient' button write function that adds each ingredient to an array/might need local storage
getIngredientInputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  //this targets the input from the add ingredients part of the process
  var $currentIngredientAdded = $("#add-ingredient-input");
  var currentIngredientString = $currentIngredientAdded.val().trim();

  //this clears the last searched ingredient from the input area so another ingredient can be entered without having to delete your last search
  var clearLastSearchedIngredient = document.getElementById(
    "add-ingredient-input"
  );
  clearLastSearchedIngredient.value = "";

  //checks to make sure there was something in input area when submit button is pressed
  if (currentIngredientString === "") {
    alert("ERROR: NO INGREDIENT ENTERED");
    return;
  }

  //add the string to the 'ingredientsArr' array that is storing every ingredient added
  ingredientsArr.push(currentIngredientString);
  console.log(ingredientsArr);
  //TODO: write a function that will display the array of searched ingredients INTO THE 'list-of-entered-ingredients-container'
  //renderIngredientsOnSearchList();
});
