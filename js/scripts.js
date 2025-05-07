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
};
