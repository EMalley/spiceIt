
function displayRecipe(){
    var request = sessionStorage.getItem("dishName")
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+ request;
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var result = response.meals;
            var imageDiv = $('#food-pic')
            var nameDiv = $('#recipe-name')
            var descriptionDiv = $('#recipe')
            imageDiv.attr('src', result[0].strMealThumb)
            nameDiv.append(result[0].strMeal)
            descriptionDiv.append(result[0].strInstructions)
            
            var ingredientsDisplay = [];
            var ingredients = []
            var quantities = []
            for (var j = 1; j <= 20; j++) {
                var ingredient = result[0][`strIngredient${j}`];
                var quantity = result[0][`strMeasure${j}`]
                if (quantity) {
                    quantities.push(quantity)
                }
                if (ingredient) {
                    ingredientsDisplay.push(' '+ingredient+'('+quantity+')');
                    ingredients.push(ingredient)
                }
            }
            $('#ingredients').html('<strong>Ingredients: </strong>'+ingredientsDisplay)
            var amazonJson = {
                "ingredients": []
            }
            for(q=0;q<ingredients.length;q++) {
                var ingredientJSON = {
                    "name": "",
                    "quantityList": [
                      {
                        "unit": "COUNT",
                        "amount": 1
                      },
                      {
                        "unit": "KILOGRAMS",
                        "amount": 0.001
                      }
                    ]
                  }
                var productName = ingredients[q]
                var productQuantity = quantities[q]
                ingredientJSON[`name`] = productName
                amazonJson.ingredients.push(ingredientJSON)
            }
            $('#amazon-input').val(JSON.stringify(amazonJson))        
    })
}
    
$(document).ready(function() {
    displayRecipe()
    })
