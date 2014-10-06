$(function() {
  var addLi = document.querySelector("nav.site li.add");
  addLi.addEventListener("click", function() {
    $.getJSON("/categories", 
      null, 
      function(categoriesJSON){
        var addContactsSection = document.querySelector("section.content");
        addContactsSection.innerHTML = "";
        var addContactsHeader = document.createElement("h2");
        addContactsHeader.innerText = "Add a Contact";
        addContactsSection.appendChild(addContactsHeader);

        var addContactsNameLabel = document.createElement("label");
        var addContactsNameSpan = document.createElement("span");
        addContactsNameSpan.innerText = "Name: ";
        addContactsNameLabel.appendChild(addContactsNameSpan);
        var addContactsNameInput = document.createElement("input");
        addContactsNameInput.id = "name_input";
        addContactsNameInput.name = "name";
        addContactsNameInput.type = "text";
        addContactsNameLabel.appendChild(addContactsNameInput);
        addContactsSection.appendChild(addContactsNameLabel);

        var addContactsCategoryLabel = document.createElement("label");
        addContactsCategorySpan = document.createElement("span");
        addContactsCategorySpan.innerText = "Category: ";
        addContactsCategoryLabel.appendChild(addContactsCategorySpan);
        var addContactsCategorySelect = document.createElement("select");
        addContactsCategorySelect.id = "category_input";
        addContactsCategorySelect.name = "category";
        $.each(categoriesJSON, function(idx, categoryObj) {
          var categoryOption = document.createElement("option");
          categoryOption.innerText = categoryObj.name; 
          categoryOption.value = categoryObj.id;
          addContactsCategorySelect.appendChild(categoryOption);  
        });
        addContactsCategoryLabel.appendChild(addContactsCategorySelect);
        addContactsSection.appendChild(addContactsCategoryLabel);

        var addContactsAgeLabel = document.createElement("label");
        var addContactsAgeSpan = document.createElement("span");
        addContactsAgeSpan.innerText = "Age: ";
        addContactsAgeLabel.appendChild(addContactsAgeSpan);
        var addContactsAgeInput = document.createElement("input");
        addContactsAgeInput.id = "age_input";
        addContactsAgeInput.name = "age";
        addContactsAgeInput.type = "date";
        addContactsAgeLabel.appendChild(addContactsAgeInput);
        addContactsSection.appendChild(addContactsAgeLabel);

        var addContactsAddrLabel = document.createElement("label");
        var addContactsAddrSpan = document.createElement("span");
        addContactsAddrSpan.innerText = "Address: ";
        addContactsAddrLabel.appendChild(addContactsAddrSpan);
        var addContactsAddrInput = document.createElement("input");
        addContactsAddrInput.id = "address_input";
        addContactsAddrInput.name = "address";
        addContactsAddrInput.type = "text";
        addContactsAddrLabel.appendChild(addContactsAddrInput);
        addContactsSection.appendChild(addContactsAddrLabel);

        var addContactsNumberLabel = document.createElement("label");
        var addContactsNumberSpan = document.createElement("span");
        addContactsNumberSpan.innerText = "Number: ";
        addContactsNumberLabel.appendChild(addContactsNumberSpan);
        var addContactsNumberInput = document.createElement("input");
        addContactsNumberInput.id = "number_input";
        addContactsNumberInput.name = "number";
        addContactsNumberInput.type = "tel";
        addContactsNumberLabel.appendChild(addContactsNumberInput);
        addContactsSection.appendChild(addContactsNumberLabel);

        var addContactsPictureLabel = document.createElement("label");
        var addContactsPictureSpan = document.createElement("span");
        addContactsPictureSpan.innerText = "Picture URL: ";
        addContactsPictureLabel.appendChild(addContactsPictureSpan);
        var addContactsPictureInput = document.createElement("input");
        addContactsPictureInput.id = "picture_input";
        addContactsPictureInput.name = "picture";
        addContactsPictureInput.type = "url";
        addContactsPictureLabel.appendChild(addContactsPictureInput);
        addContactsSection.appendChild(addContactsPictureLabel);

        var submitButton = document.createElement("button");
        addContactsSection.appendChild(submitButton);
        submitButton.addEventListener("click", function() {
          var pictureInput = document.querySelector("#picture_input");
          var numberInput = document.querySelector("#number_input");
          var addressInput = document.querySelector("#address_input");
          var ageInput = document.querySelector("#age_input");
          var categoryInput = document.querySelector("#category_input");
          var nameInput = document.querySelector("#name_input");

          var bDay = new Date(ageInput.value);
          var currentDate = new Date;
          var diff = currentDate - bDay; 
          var massive = 1000 * 60 * 60 * 24 * 365; 
          var contactAge = Math.floor((1/massive)*diff); 

          var params = {
            "name": nameInput.value, 
            "age": contactAge, 
            "address": addressInput.value, 
            "phone_number": numberInput.value, 
            "picture": pictureInput.value, 
            "category_id": categoryInput.value 
          };
          $.post("/contacts", params, function(newContact) {
            var whichCategory = newContact.category_id;
            buildCategoryContactsView(whichCategory);
          }, "JSON");
        });
      });
    });
  $.getJSON("/categories", 
    null, 
    function(categoriesJSON) {
      var $categoryNav = $("nav.categories");

      $.each(categoriesJSON,
        function(idx, categoryObj) {
          var categoryId = categoryObj.id;
          var categoryName = categoryObj.name; 
          var categoryLi = document.createElement("li");
          var categoryButton = document.createElement("h2");
          categoryButton.id = categoryId; 
          categoryButton.innerText = categoryName;
          categoryButton.addEventListener("click", function(e) {
            var categoryId = e.srcElement.id;
            buildCategoryContactsView(categoryId);
          });
          $categoryNav.append(categoryButton);
        });
    });
});

function buildCategoryContactsView(categoryId) {
  $.getJSON("/categories/" + categoryId, null,
    function(categoryJSON) {
      var contactSection = document.querySelector("section.content");
      contactSection.innerHTML = "";
      var contactList = document.createElement("ul");
      contactSection.appendChild(contactList);
      var contacts = categoryJSON.contacts;
      var contactLi = document.createElement("li");
      $.each(contacts, 
        function(idx, contact) {

          var contactSection = document.createElement("section");
          var contactId = contact.id;
          contactSection.id = contactId;

          var contactPicture = contact.picture;
          var contactImg = document.createElement("img");
          contactImg.src = contactPicture; 

          var contactName = contact.name; 
          var contactHeader = document.createElement("h2");
          contactHeader.innerText = contactName;

          var contactAge = contact.age;
          var agePara = document.createElement("p");
          var ageSpan = document.createElement("span");
          ageSpan.innerText = "Age: ";
          var age = document.createTextNode(contactAge);
          agePara.appendChild(ageSpan);
          agePara.appendChild(age);

          var contactNumber = contact.phone_number;
          var numberPara = document.createElement("p");
          var numberSpan = document.createElement("span");
          numberSpan.innerText = "Phone Number: ";
          var number = document.createTextNode(contactNumber);
          numberPara.appendChild(numberSpan);
          numberPara.appendChild(number);

          var contactAddress = contact.address;
          var addressPara = document.createElement("p");
          var addressSpan = document.createElement("span");
          addressSpan.innerText = "Address: ";
          var address = document.createTextNode(contactAddress);
          addressPara.appendChild(addressSpan);
          addressPara.appendChild(address);

          var editButton = document.createElement("button");
          editButton.innerText = "Edit";
          editButton.addEventListener("click", function(e) {
            var editId = e.srcElement.parentNode.id;
            $.getJSON("/contacts/" + editId, null, function(contactJSON) {
              editContactView(contactJSON);
            }); 
          });

          contactSection.appendChild(contactImg);
          contactSection.appendChild(contactHeader);
          contactSection.appendChild(agePara);
          contactSection.appendChild(numberPara);
          contactSection.appendChild(addressPara);
          contactSection.appendChild(editButton);

          contactLi.appendChild(contactSection);
        });
  contactList.appendChild(contactLi);
  }); 
} 

function editContactView(contactObj) {
  var editView = document.querySelector("section.content");
  editView.innerHTML = "";
  $.getJSON("/categories", null, function(categories) {
    for (var property in contactObj) {
      var theLabel = document.createElement("label");
      var theSpan = document.createElement("span");
      var theValue = contactObj[property];
      console.log(property);
      switch (property) {
        case "age":
          var theInput = document.createElement("input");
          theInput.name = property; 
          theInput.id = property + "_input"; 
          theInput.type = "date";
          theInput.value = theValue;
        break; 
        case "phone_number":
          var theInput = document.createElement("input");
          theInput.name = property; 
          theInput.id = property + "_input";
          theInput.type = "tel";
          theInput.value = theValue; 
        break; 
        case "category_id":
          var theInput = document.createElement("select");
          theInput.name = property; 
          theInput.id = property + "_input";
          theInput.value = theValue; 
            $.each(categories, function(idx, category) {
              var anOption = document.createElement("option");
              var catVal = category.id;
              var catName = category.name; 
              anOption.value = catVal; 
              anOption.innerHTML = catName; 
            });
        break; 
        case "id": 
          var theInput = document.createElement("input");
          theInput.name = property;
          theInput.id = property + "_input";
          theInput.type = "hidden";
          theInput.value = theValue; 
        break; 
        default: 
          var theInput = document.createElement("input");
          theInput.name = property;
          theInput.id = property + "_input";
          theInput.type = "text";
          theInput.value = theValue; 
        break; 
      }
    }
  });
}