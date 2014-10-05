$(function() {

  $.getJSON("/categories", 
    null, 
    function(categoriesJSON) {
      var $categoryNav = $("nav.categories");
      $.each(categoriesJSON,
        function(idx, catagoryObj) {
          var categoryId = catagoryObj.id;
          var categoryName = catagoryObj.name; 
          var categoryLi = document.createElement("li");
          var categoryButton = document.createElement("h2");
          categoryButton.id = categoryId; 
          categoryButton.innerText = categoryName;
          categoryButton.addEventListener('click', function(e) {
          });
          $categoryNav.append(categoryButton);
        });
    });
});