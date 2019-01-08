function displayRecipe() {
  let request = indexedDB.open('dishDatabase', 1);
  request.onsuccess = function(e) {
    db = request.result;
    tx = db.transaction("dishName", 'readwrite');
    store = tx.objectStore('dishName');
    db.onerror = function(e) { 
      console.log('error' + e.target.errorCode)
    }
    let q1 = store.get(1)
    q1.onsuccess = function() {
      console.log(q1.result.dishName)
    
  
      //var request = localStorage.getItem('mealId');
      var queryURL =
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + q1.result.dishName;

      console.log(queryURL);

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
        var result = response.meals;
        var imageDiv = $('#food-pic');
        var nameDiv = $('#recipe-name');
        var descriptionDiv = $('#recipe');
        imageDiv.attr('src', result[0].strMealThumb);
        nameDiv.append(result[0].strMeal);
        descriptionDiv.append(result[0].strInstructions);
        var ingredientsDisplay = [];
        var ingredients = [];
        var quantities = [];
        console.log(result[0].strYoutube)
        var video = result[0].strYoutube
        video1 = video.replace(/watch\?v=/g,'embed/')
        console.log(video1)
        $('.mealVideo').append('<iframe class="video" src="'+video1+'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>')
        for (var j = 1; j <= 20; j++) {
          var ingredient = result[0][`strIngredient${j}`];
          var quantity = result[0][`strMeasure${j}`];
          if (quantity) {
            quantities.push(quantity);
          }
          if (ingredient) {
            ingredientsDisplay.push(' ' + ingredient + '(' + quantity + ')');
            ingredients.push(ingredient);
          }
        }
        $('.ingredients').html(
          '<strong>Ingredients: </strong>' + ingredientsDisplay
        );
        var amazonJson = {
          ingredients: []
        };
        for (q = 0; q < ingredients.length; q++) {
          var ingredientJSON = {
            name: '',
            quantityList: [
              {
                unit: 'COUNT',
                amount: 1
              },
              {
                unit: 'KILOGRAMS',
                amount: 0.1
              }
            ]
          };
          var productName = ingredients[q];
          var productQuantity = quantities[q];
          ingredientJSON[`name`] = productName;
          amazonJson.ingredients.push(ingredientJSON);
        }
        $('#amazon-input').val(JSON.stringify(amazonJson));
      });
    }
  }
}

$(document).ready(function() {
  displayRecipe();
});
