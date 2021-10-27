//DEPENDENCIES
//targets the button the users presses to enter their name at the top of the page
var getNameInputBtn = document.getElementById("button-addon2");
var getIngredientInputBtn = document.getElementById("submit-ingredient-btn");
var clearBtn = document.getElementById("clear-btn");
var getRecipeBtn = document.getElementById("search-recipe-btn");
var getIngredientInputEl = document.getElementById("add-ingredient-input");

//DATA
//need to store name of current user after they enter it in getNameInput event listenter
var currentUserName = "";

//FUNCTIONS
//uses the name the user entered to display a message unique to the current user
function welcomeUser() {
  //variable to target span to add user's name to
  document.getElementById("name-input-box").setAttribute("hidden", true);
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

function checkUserInput(string) {
  if (string === "") {
    alert("ERROR: SUBMISSION OF EMPTY INPUT");
    return;
  } else if (typeof string !== "string") {
    alert(
      "ERROR: ONLY ALLOWED TO INPUT NON-NUMERICAL AND NON-SPECIAL CHARACTERS"
    );
    return;
  }
}

//TODO: WRITE FUNCTION TO SHOW THE CURRENT LIST OF SEARCHED INGREDIENTS IN 'list-of-entered-ingredients-container'
function renderIngredientsOnSearchList() {
  var ingredientsList = [];
  var ingredientAdd = getIngredientInputEl.value;
  var li = document.createElement("li");
  li.append(ingredientAdd);
  document.getElementById("ingredients-list").appendChild(li);
  ingredientsList.push(ingredientAdd);
  getIngredientInputEl.value = null;
  var ingredientsUrl = "";
  for (let i = 0; i < ingredientsList.length; i++) {
    ingredientsUrl += ingredientsList[i];
  }
  console.log(ingredientsUrl);
  fetch(
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=" +
      ingredientsList +
      "&ignorePantry=true",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "ea91f8aed7mshe4416b806d0b4cdp1081acjsn9031a359a4ff",
      },
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
getRecipeBtn.addEventListener("click", function (event) {
  event.preventDefault();
});

//TODO: WRITE A FUNCTION THAT ADDS A 'SEARCH FOR RECIPES' BUTTON ONTO THE LIST OF INGREDIENTS ADDED TO THE LIST TO BE SEARCHED
function addAbilityToSearchRecipes() {}

//create a button and add it to end 'list-of-entered-ingredients-container'

//USER INTERACTIONS
//DONE: save the users input when they are prompted at the very start of the page
getNameInputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  //DONE: write code so that when user presses button to submit their name, if something has been entered in the input area, we need to save the name and display it to the span where the text is like "Hello ____! Welcome to Foode!"
  //targets the <input> for the user
  var $userNameInput = $("#name-input");
  currentUserName = $userNameInput.val().trim();

  //checks to make sure there was something in input area when submit button is pressed
  checkUserInput(currentUserName);

  //call a function that adds the users name to the <span> in the header welcoming them
  welcomeUser();
});

//TODO: When the user clicks the 'Add Ingredient' button write function that adds each ingredient to an array/might need local storage
getIngredientInputBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //this targets the input from the add ingredients part of the process
  renderIngredientsOnSearchList();
});

clearBtn.addEventListener("click", function () {
  ingredientsList = [];
  document.getElementById("ingredients-list").innerHTML = " ";
});
