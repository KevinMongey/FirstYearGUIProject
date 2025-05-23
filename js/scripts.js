//save form info to local storage
function saveForm() {
    document.getElementById('newRecipe')
    
    //gets values from forms and sends them to variable
    let title = document.getElementById('title').value;
    let ingredients = document.getElementById('ingredients').value;
    let steps = document.getElementById('steps').value;
    let cuisine = document.getElementById('cuisine').value;
    let difficulty = document.getElementById('difficulty').value;
    let time = document.getElementById('time').value;
    let image = document.getElementById('image').value;

    //check to see if every field is filled in
    if (!title || !ingredients || !steps || !cuisine || !difficulty || !time || !image) {
        alert("Please fill in all fields before saving the recipe.");
        return;
    }

    //making recipe object
    let recipe = {
        title: title,
        ingredients: ingredients,
        steps: steps,
        cuisine: cuisine,
        difficulty: difficulty,
        time: time,
        image: image,
    };
    //array for all the recipes in localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    recipes.push(recipe); //add new recipie to the array

    //send the updated array back to the localStorage
    localStorage.setItem("recipes", JSON.stringify(recipes));

    alert('Recipe Added!');
};

function loadRecipes() {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    let container = document.getElementById('recipe-div');

    //clears content on refresh
    container.innerHTML = "";

    //case for when no recipies are in local storage
    if(recipes.length === 0) {
        container.innerHTML = "<p>No recipies added yet.</p>"
        return;
    }
    //for loop to create a card for each recipe
    recipes.forEach(recipe => {
        let card = document.createElement('div');
        card.className = 'recipe-card';
        card.setAttribute('data-title', recipe.title); 
        //formatting for the recipe cards
        card.innerHTML = `
        <img src="${recipe.image || 'images/default.jpg'}" alt="${recipe.title}" />
        <h2>${recipe.title}</h2>
        <p><strong>Cook Time:</strong> ${recipe.time} min</p>
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <h3>Ingredients:</h3>
        <p>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
        <h3>Method:</h3>
        <p>${recipe.steps.replace(/\n/g, '<br>')}</p>
    `;

    container.appendChild(card); //append card

    });
};

window.addEventListener('DOMContentLoaded', () => {
    loadRecipes(); //load recipes on page load

    //listens for changes in the search input
    document.querySelector("[data-search]").addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase();
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

        //checks cards exits before filter
        document.querySelectorAll('.recipe-card').forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const isMatch = title.includes(value); //chekcing for matches
            card.classList.toggle("hide", !isMatch);
        });
    });
});


