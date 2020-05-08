
function fetchMeals(foodName) {
    let results = document.querySelector('.js-search-results');
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    let settings = {
        method : "GET"
    };

    results.innerHTML = "";

    fetch( url, settings)
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON);
            let responseArray = responseJSON.meals;
            if(responseArray.length === 0) {
                results.innerHTML = "Meal not found";
            } else {
                responseArray.forEach(food => {
                    results.innerHTML += `
                        <div>
                            <img src="${food.strMealThumb}" alt="${food.strMeal}" width="50px"/>
                            <p>${food.strMeal}</p>
                            <p>${food.strArea}</p>
                            <p>${food.strInstructions}</p>
                        </div>
                    `;
                });
            }
        })
        .catch( err => {
            results.innerHTML = `Meal not found`;
        });
}

function watchMealsForm() {
    let form = document.querySelector(".js-search-form");
    let foodName = document.querySelector("#query");
    form.addEventListener("submit", ev => {
        // console.log(foodName.value);
        ev.preventDefault();
        fetchMeals(foodName.value);
    });
}

function init() {
    watchMealsForm();
}

init();