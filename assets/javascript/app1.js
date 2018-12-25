
function displayRecipe(){
    var request = $('#search-input').val()
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+'pork cassoulet';
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
            
            var ingredients = [];
            for (var j = 1; j <= 20; j++) {
                var ingredient = result[0][`strIngredient${j}`];
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            $('#ingredients').html('<strong>Ingredients: </strong>'+ingredients.toString())
    })
}
$(document).ready(function() {
    displayRecipe()
})
