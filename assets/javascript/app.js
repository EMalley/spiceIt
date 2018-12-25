
function displayRecipe(){
    var request = $('#search-input').val()
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+request;
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var result = response.meals;
        for (var i=0;i<result.length;i++) {
            var recipeLine = $('<tr></tr>');
            var imageDiv = $('<img style="height:75px" class="meal-image">')
            var nameDiv = $('<th class="name">')
            var descriptionDiv = $('<th class=description>')
            imageDiv.attr('src', result[i].strMealThumb)
            nameDiv.append(result[i].strMeal)
            descriptionDiv.append(result[i].strInstructions)
            descriptionDiv.text(descriptionDiv.text().substring(0,300))
            recipeLine.append(imageDiv).append(nameDiv).append(descriptionDiv)
            $('#result-table').append(recipeLine)

            var ingredients = [];
            for (var j = 1; j <= 20; j++) {
                var ingredient = result[i][`strIngredient${j}`];
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            console.log(ingredients);
        }
    })
}

$(document).ready(function() {
    $(document).on('click', '#search-btn', function(event) {
        event.preventDefault()
        displayRecipe()
    })

})