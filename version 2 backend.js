const rc = 2
const searchBtn = document.getElementById('search-btn');

const mealList = document.getElementById('meal');

const mealDetailsContent = document.querySelector('.meal-details-content');

const recipeCloseBtn = document.getElementById('recipe-close-btn');



//test cusine buttons
//const searchbycusine = document.getElementsByClassName('cuisine') 

 

// event listeners

searchBtn.addEventListener('click', getMealList);

mealList.addEventListener('click', getMealRecipe);

//searchbycusine.addEventListener('click', getMealListofgivencusine(String((searchbycusine.value))));

//searchbycusine.addEventListener('click', getMealListofgivencusine(searchbycusine.value));


/////
recipeCloseBtn.addEventListener('click', () => {

    mealDetailsContent.parentElement.classList.remove('showRecipe');

});

//////////////
if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    var element = event.target;

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON" && /cuisine/.test(element.className)) {
            // The user clicked on a <button> or clicked on an element inside a <button>
            // with a class name called "foo"
            doSomething(element);
            break;
        }

        element = element.parentNode;
    }
}

function doSomething(button) {
    // do something with button
    getMealListofgivencusine(String((button.value)))
}

//////////


 
 

// get meal list that matches with the search query 

function getMealListofgivencusine(cusineasked){
    //let givencusine = document.getElementsByClassName("cuisine").value;
    let givencusine =  cusineasked
  

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&number=${rc}&query="${givencusine}"&cusine=${givencusine}`)

    .then(response => response.json())

    .then(data => {

        let html = "";

        if(data.results){

            data.results.forEach(meal => {

                html += `

                    <div class = "meal-item" data-id = "${meal.id}">

                        <div class = "meal-img">

                            <img src = "${meal.image}" alt = "food">

                        </div>

                        <div class = "meal-name">

                            <h3>${meal.title}</h3>

                            <a href = "#" class = "recipe-btn">Get Recipe</a>

                        </div>

                    </div> `              

            })  

            mealList.classList.remove('notFound');

        } else{

            html = "Sorry, we didn't find any meal!";

            mealList.classList.add('notFound');

        }

 

        mealList.innerHTML = html;

    });

   

}


//get meal list by cusine 
function getMealList(){

    let searchInputTxt = document.getElementById('search-input').value.trim();
    if (searchInputTxt =="" || searchInputTxt == null){
        getRandomRecipe()


    }
    else{
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&number=${rc}&query=${searchInputTxt}`)

    .then(response => response.json())

    .then(data => {

        let html = "";

        if(data.results){

            data.results.forEach(meal => {

                html += `

                    <div class = "meal-item" data-id = "${meal.id}">

                        <div class = "meal-img">

                            <img src = "${meal.image}" alt = "food">

                        </div>

                        <div class = "meal-name">

                            <h3>${meal.title}</h3>

                            <a href = "#" class = "recipe-btn">Get Recipe</a>

                        </div>

                    </div> `              

            })  

            mealList.classList.remove('notFound');

        } else{

            html = "Sorry, we didn't find any meal!";

            mealList.classList.add('notFound');

        }

 

        mealList.innerHTML = html;

    });

   


    }
  
    

}

 

// get meal recipe

 

function getMealRecipe(e){

    e.preventDefault();

    if(e.target.classList.contains('recipe-btn')){

        let mealItem = e.target.parentElement.parentElement;

        fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/analyzedInstructions?apiKey=${apikey}`)

        .then(response => response.json())

        .then(data => mealRecipeModal(data));

}

}

// create modal

 

function mealRecipeModal(meal){

    console.log(meal);

    meal = meal[0];

   

    let html = `

        <h2 class = "recipe-title" class= "meal-name"></h2>

        <p class = "recipe-category">${meal}</p>

        <div class = "recipe-instruct">

            <h3>Instructions:</h3>

            <p>${meal.steps[0].step}</p>

        </div>

        <div class = "recipe-meal-img">

            <img src = "${meal.image}" alt = "">

        </div>

        <div class = "recipe-link">

            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>

        </div>

    `;

    mealDetailsContent.innerHTML = html;

    mealDetailsContent.parentElement.classList.add('showRecipe');

}

function getRandomRecipe(){ //returns single random recipe
    let urltobe = `https://api.spoonacular.com/recipes/random?apiKey=${apikey}`
    console.log(urltobe)
    fetch(urltobe)
        .then(res => res.json())
        .then(data => console.log(data))
    

 }


