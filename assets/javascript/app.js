
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
            var name = result[i].strMeal
            var class1 = name.replace(/\s/g, '')
            imageDiv.attr('src', result[i].strMealThumb)
            nameDiv.append(result[i].strMeal).attr('id', class1).attr('fullName', name)
            $(document).on('click', '#' +class1, function() {
                localStorage.setItem("dishName", $(this).attr('fullName'))
                window.open('recipe.html', '_blank')
            })
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
            localStorage.setItem("request",request)
        }
    })
}

$(document).ready(function() {
    $(document).on('click', '#search-btn', function(event) {
        event.preventDefault()
        displayRecipe()
        $('#result-table').css('background-color', 'rgb(255,229,236,0.7)')
    })

})