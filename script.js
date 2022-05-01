

const apikey= '5040f01b83684cf1b279dc0b7b77785d'




const rc = 2
const searchBtn = document.getElementById('search-btn');

const mealList = document.getElementById('meal');

const mealDetailsContent = document.querySelector('.meal-details-content');
const mealInstructionsContent = document.querySelector('.meal-instruction-content');


const recipeCloseBtn = document.getElementById('recipe-close-btn');




 

// event listeners

searchBtn.addEventListener('click', getMealList);

mealList.addEventListener('click', getMealsummary);

mealDetailsContent.addEventListener('click', getMealInstructions)





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
        if (element.nodeName === "DIV" && /media-element/.test(element.className)) {
            // The user clicked on a <input> or clicked on an element inside a <input>
            // with a class name called "foo"
            doSomething(element);
           
            
            break;
        }

        element = element.parentNode;
    }
}

function doSomething(input) {
    // do something with input
    
    getMealListofgivencusine(String(input.id))

    
}

//////////

const images = document.querySelectorAll(".carousel");
      let i = 0;

      setInterval(function(){
        myFunctiongoForward()
        
        }, 2500);

        

      
      setInterval(myFunctiongoForward, 2000); 
      var myFunctiongoBack = function(){//works
        if(i != 0 ){
          images[i].style.display = 'none';
          images[i-1].style.display = 'block';
          i--;
        }
        else{
          images[i].style.display = 'none';
          images[images.length-1].style.display = 'block'; 
          i = images.length -1 ; //try it now!
        }
      }
        
    var myFunctiongoForward = function(){//fixed
      if(i != images.length-1){ 
        images[i].style.display = 'none';
        images[i+1].style.display = 'block';
        i++;
      }
      else{
        images[i].style.display = 'none';
        images[0].style.display = 'block';
        i = 0;
      }

      
    }

    document.addEventListener('keydown',logkey);
        function logkey(e){
          console.log.textContent;
          
          
          if(e.code === "ArrowRight"){
            
            myFunctiongoForward()
          }
          if(e.code === "ArrowLeft"){
         
            myFunctiongoBack()
          }
        }

///////////


 
 

// get meal list that matches with the search query 

function getMealListofgivencusine(cusineasked){
    showresults()
    //let givencusine = document.getElementsByClassName("cuisine").id;
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

                            <a href = "#" class = "summary-btn">Get Summary</a>

                        </div>

                    </div> `              

            })  

            mealList.classList.remove('notFound');

        } else{

            html = "Sorry, we didn't find any recipes!";

            mealList.classList.add('notFound');

        }

 

        mealList.innerHTML = html;

    });

   

}




function getMealList(){
    showresults()
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

                            <a href = "#" class = "summary-btn">Get Summary</a>

                        </div>

                    </div> `              

            })  
        

            mealList.classList.remove('notFound');

        } else{

            html = "Sorry, we didn't find any recipes!";

            mealList.classList.add('notFound');

        }
    

 

        mealList.innerHTML = html;

    });
    }
}

// get meal summary

 

function getMealsummary(e){

    e.preventDefault();
   
 console.log(e.target.parentElement.parentElement);
    if(e.target.classList.contains('summary-btn')){

        let mealItem = e.target.parentElement.parentElement;

        fetch(`https://api.spoonacular.com/recipes//${mealItem.dataset.id}/summary?apiKey=${apikey}`)
        

        .then(response => response.json())

        .then(data => mealsummaryModal(data));

};

}

// create modal

 

function mealsummaryModal(meal){

    console.log(meal);

    

   

    let html = 

   ` <div class = "meal-item" data-id = "${meal.id}">

                        <div class = "title">

                           <h2> ${meal.title}</h2>

                        </div>

                        <div class = "meal-summary">

                            <p>${meal.summary}</p>

                            <a href = "#" class = "recipe-btn">Get recipe</a>

                        </div>

                    </div> `              

    mealDetailsContent.innerHTML = html;

    mealInstructionsContent.parentElement.classList.add('showRecipe');
    

}

// recipe instructions


 function getMealInstructions(e){
   
    e.preventDefault();

  console.log(e.target.parentElement.parentElement) // working on this, need to find how to access the e.target (Recipe-btn)

    if(e.target.classList.contains('recipe-btn')){

        let recipeItem =  e.target.parentElement.parentElement;

         fetch(`https://api.spoonacular.com/recipes//${recipeItem.dataset.id}/analyzedInstructions?apiKey=${apikey}`)
        
         .then(response => response.json())

        .then(data => mealInstructionsModal(data));
        

};

}

//create modal

 

 function mealInstructionsModal(meal){
        

        console.log(meal[0].key);
    
    
    
        

    

    

   

//     let html = `

//         <h2 class = "recipe-title" class= "meal-name">Instructions</h2>

//         <div class = "recipe-instruct">

//             <h3>Recipe: Follow the Steps </h3>

//             <p>${step}</p>

//         </div>


        

//     `;

//     mealDetailsContent.innerHTML = html;
    
//     mealDetailsContent.parentElement.classList.add('recipeinst');

// }
}



 function showresults() {
    document.getElementById('reusltsdiv').style.display = "block";
    document.getElementById('hideonsearch').style.display = "none";
 
 }
