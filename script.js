document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById("recipeForm");
    const recipeDisplay = document.getElementById("recipeDisplay");
    const error = document.getElementById("error");

    let recipes = []; // array of recipes

    // Function to display recipes
    function displayRecipes() {
        recipeDisplay.innerHTML = ""; // clear existing recipes
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            const recipeTitle = document.createElement("h2");
            recipeTitle.textContent = recipe.name;

            const recipeDesc = document.createElement("p");
            recipeDesc.textContent = recipe.description;

            const recipeImage = document.createElement("img");
            recipeImage.classList.add("recipe-image");
            recipeImage.src = recipe.image;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Recipe";
            deleteBtn.classList.add("delete-btn");

            // event listener for deleting a recipe
            deleteBtn.addEventListener("click", function() {
                recipes.splice(index, 1); // remove recipe from array
                displayRecipes();
                displayMessage("delete");
            });

            // append elements to the recipe card
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeDesc);
            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(deleteBtn);

            // append recipe card to display area
            recipeDisplay.appendChild(recipeCard);
        });
    }

    // Function to display messages
    function displayMessage(type) {
        switch(type) {
            case "success":
                error.textContent = "Recipe added successfully!";
                error.style.color = "#4CAF50"; // green for success
                break;
            case "error":
                error.textContent = "Please fill out all fields and upload an image.";
                error.style.color = "#FF6B6B"; // red for error
                break;
            case "delete":
                error.textContent = "Recipe deleted successfully.";
                error.style.color = "#FFA500"; // orange for delete
                break;
            default:
                error.textContent = "";
                break;
        }

        // Clear message after 2 seconds
        setTimeout(() => {
            error.textContent = "";
        }, 2000);
    }

    // Event listener for adding a recipe
    recipeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validate inputs
        const recipeName = document.getElementById("recipeName").value.trim();
        const recipeDescription = document.getElementById("recipeDescription").value.trim();
        const recipeImageFile = document.getElementById("recipeImage").files[0];

        if (!recipeName || !recipeDescription || !recipeImageFile) {
            displayMessage("error");
            return;
        }

        // Add recipe to the array
        recipes.push({
            name: recipeName,
            description: recipeDescription,
            image: URL.createObjectURL(recipeImageFile)
        });

        displayMessage("success"); // Display success message
        displayRecipes(); // Display updated recipes
        recipeForm.reset(); // Clear form
    });
});
