//DEPENDENCIES
//targets the button the users presses to enter their name at the top of the page
var getNameInputBtn = document.getElementById("button-addon2");
var getIngredientInputBtn = document.getElementById("submit-ingredient-btn");
var clearBtn = document.getElementById("clear-btn");
var clearRecipeBtn = document.getElementById("clear-recipe-btn");
var getRecipeBtn = document.getElementById("search-recipe-btn");
var getIngredientInputEl = document.getElementById("add-ingredient-input");
var recipeTitleEl = document.getElementById("recipe-title");
var recipeImgEl = document.getElementById("recipe-img");
var recipeImgUrlEl = document.getElementById("recipe-img-url");
var searchAnotherRecipeBtn = document.getElementById("another-recipe-btn");
var saveRecipeBtn = document.getElementById("save-recipe-btn");

//DATA
//need to store name of current user after they enter it in getNameInput event listenter
var currentUserName = "";
var ingredientsList = [];
var ingredientsUrl = "";
var recipeNum = 0;
var savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
if (savedRecipes == null) {
  savedRecipes = [];
}
for (let i = 0; i < savedRecipes.length; i++) {
  var li = document.createElement("li");
  li.append(savedRecipes[i]);
  document.getElementById("saved-recipes").appendChild(li);
}

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
  document
    .getElementById("saved-recipes-container")
    .setAttribute("style", "display:block");
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

//SHOWS THE CURRENT LIST OF SEARCHED INGREDIENTS IN 'list-of-entered-ingredients-container'
function renderIngredientsOnSearchList() {
  document
    .getElementById("list-of-entered-ingredients-container")
    .setAttribute("style", "display:block");
  var ingredientAdd = getIngredientInputEl.value;
  var li = document.createElement("li");
  li.append(ingredientAdd);
  document.getElementById("ingredients-list").appendChild(li);
  ingredientsList.push(ingredientAdd);
  console.log(ingredientsList);
  //creates url for api
  getIngredientInputEl.value = null;
  var ingredientsUrl = ingredientsList[0];
  for (let i = 1; i < ingredientsList.length; i++) {
    ingredientsUrl += ingredientsList[i];
  }
  console.log(ingredientsUrl);
  //connects to recipe title API
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
      //seraches recipes using ingredients list and pulls id
      function searchRecipes() {
        recipeTitleEl.innerHTML = data[recipeNum].title;
        recipeImgEl.setAttribute("src", data[recipeNum].image);
        var recipeID = data[recipeNum].id;
        //connects to recipe links using id
        fetch(
          "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
            recipeID +
            "/information",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host":
                "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "ea91f8aed7mshe4416b806d0b4cdp1081acjsn9031a359a4ff",
            },
          }
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data2) {
            console.log(data2);
            recipeImgUrlEl.href = data2.sourceUrl;
            recipeNum++;
          });
      }
      //displayes recipe pulled and lets user cycle through
      getRecipeBtn.addEventListener("click", function (event) {
        event.preventDefault();
        document
          .getElementById("save-recipe-btn")
          .setAttribute("style", "display:block");
        //this targets the input from the add ingredients part of the process
        document
          .getElementById("recipe-card")
          .setAttribute("style", "display:block");
        searchRecipes();
      });
    });
}
//saves recipe url to local storage and displays in saved recipe container
saveRecipeBtn.addEventListener("click", function () {
  var save = recipeImgUrlEl.href;
  var li = document.createElement("li");
  li.append(save);
  savedRecipes.push(save);
  document.getElementById("saved-recipes").appendChild(li);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
});

//save the users input when they are prompted at the very start of the page
getNameInputBtn.addEventListener("click", function (event) {
  event.preventDefault();

  //pulls name input
  var $userNameInput = $("#name-input");
  currentUserName = $userNameInput.val().trim();

  //checks to make sure there was something in input area when submit button is pressed
  checkUserInput(currentUserName);

  //call a function that adds the users name to the <span> in the header welcoming them
  welcomeUser();
});

//when the user clicks the 'Add Ingredient' button this adds each ingredient to an array/might need local storage
getIngredientInputBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //this targets the input from the add ingredients part of the process
  renderIngredientsOnSearchList();
});
//clears ingredients list
clearBtn.addEventListener("click", function () {
  ingredientsList = [];
  document.getElementById("ingredients-list").innerHTML = " ";
  document
    .getElementById("saved-recipes-container")
    .setAttribute("style", "display:none");
  document.getElementById("recipe-card").setAttribute("style", "display:none");
});

clearRecipeBtn.addEventListener("click", function () {
  savedRecipes = [];
  document.getElementById("saved-recipes").innerHTML = " ";
});
