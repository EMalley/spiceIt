/* Notes:
`blah blah ${javascript expression}` -> template literals (ES6+ feature)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
instead of 'blah blah ' + (javascript expression/value) -> string concatenation using '+'
*/

function createMealCard(mealId, imgSrc, name, desc) {
  var cardDiv = $('<div>', { 
    class: 'card meal-card',
    'data-mealId': mealId 
  });
  var imageDiv = $('<img>', { 
    class: 'meal-image w-100',
    alt: `${name} image`,
    src: imgSrc 
  });
  var cardBodyDiv = $('<div>', { class: 'card-body' });
  var nameDiv = $('<div>', { 
    class: 'meal-name text-center',
    html: `<h3 class="text-truncate">${name}</h3>` 
  });
  var descDiv = $('<div>', { 
    class: 'meal-desc',
    text: `${desc.substring(0,150)}...` 
  });
  
  cardBodyDiv.append(nameDiv, descDiv);
  cardDiv.append(imageDiv, cardBodyDiv);

  return cardDiv;
}

function displayRecipe() {
  var request = $('#search-input').val();
  var queryURL =
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + request;

  console.log('queryURL: ', queryURL);

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var result = response.meals;
    for (var i = 0; i < result.length; i++) {
      var mealId = result[i].idMeal;
      var imgSrc = result[i].strMealThumb;
      var name = result[i].strMeal;
      var desc = result[i].strInstructions;
      var recipeLink = $('<a>', {
        href: 'recipe/index.html'        
      });
      var mealCard = createMealCard(mealId, imgSrc, name, desc);
      $('#result-table').append(recipeLink.append(mealCard)).attr('style', 'text-align:center; justify-content: center');
      localStorage.setItem('request', request);
    }
  });
}

$(document).ready(function() {
  $(document).on('click', '#search-btn', function(event) {
    event.preventDefault();
    $('#result-table').empty();
    displayRecipe();
  });

  $('#result-table').on('mouseover', '.meal-card', function() {
    let key = $(this).attr('data-mealId');
    let request = indexedDB.open('dishDatabase', 1),
    db,
    tx,
    store;
    request.onupgradeneeded = function(e) {
      let db = request.result,
      store = db.createObjectStore('dishName', {keyPath: 'dishName1'});
    };
    request.onerror = function(e) {
      console.log('error'+e.targer.errorCode);
    };
    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction("dishName", 'readwrite');
      store = tx.objectStore('dishName');
      db.onerror = function(e) { 
        console.log('error' + e.target.errorCode)
      }
      store.put({dishName1: 1, dishName: key})
      let q1 = store.get(1)
      q1.onsuccess = function() {
        console.log(q1.result.dishName)
      }
    }
  });
  $('#result-table').on('touchstart', '.meal-card', function() {
    let key = $(this).attr('data-mealId');
    let request = indexedDB.open('dishDatabase', 1),
    db,
    tx,
    store;
    request.onupgradeneeded = function(e) {
      let db = request.result,
      store = db.createObjectStore('dishName', {keyPath: 'dishName1'});
    };
    request.onerror = function(e) {
      console.log('error'+e.targer.errorCode);
    };
    request.onsuccess = function(e) {
      db = request.result;
      tx = db.transaction("dishName", 'readwrite');
      store = tx.objectStore('dishName');
      db.onerror = function(e) { 
        console.log('error' + e.target.errorCode)
      }
      store.put({dishName1: 1, dishName: key})
      let q1 = store.get(1)
      q1.onsuccess = function() {
        console.log(q1.result.dishName)
      }
    }
  });
});