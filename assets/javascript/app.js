
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
            var recipeLink = $('<a>')
            var recipeLine = $('<div class="card" style="height:32rem;width:20rem;margin:20px 5px 24px 5px;display:inline-block;vertical-align: top">');
            var cardBodyDiv = $('<div class="card-body">')
            var imageDiv = $('<img class="card-img-top meal-image" alt="image" style="width:100%">')
            var nameDiv = $('<div class="name">')
            var descriptionDiv = $('<div class=description>')
            var name = result[i].strMeal
            var class1 = name.replace(/\s/g, '')
            imageDiv.attr('src', result[i].strMealThumb)
            nameDiv.append('<h3>'+result[i].strMeal+'</h3>')
            $(document).on( "click", '#' +class1, function() {
                sessionStorage.setItem("dishName", $(this).attr('fullName'))
            })
            descriptionDiv.append(result[i].strInstructions)
            descriptionDiv.text(descriptionDiv.text().substring(0,150)).append('...')
            cardBodyDiv.append(nameDiv).append(descriptionDiv)
            recipeLine.append(imageDiv).append(cardBodyDiv)
            recipeLink.append(recipeLine).attr('href', 'recipe.html').attr('target', '_blank').attr('id', class1).attr('fullName', name).css('cursor:pointer')
            $('#result-table').append(recipeLink).attr('style', 'text-align:center; justify-content: center')
            var ingredients = [];
            for (var j = 1; j <= 20; j++) {
                var ingredient = result[i][`strIngredient${j}`];
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            localStorage.setItem("request",request)
        }
    })
}

$(document).ready(function() {
    $(document).on('click', '#search-btn', function(event) {
        event.preventDefault()
        $('#result-table').empty()
        displayRecipe()
    })

})