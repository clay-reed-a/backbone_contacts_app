$(function() {

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
            console.log(categoryId);
            $.getJSON("/categories/" + categoryId, null,
              function(categoryJSON) {
                console.log(categoryJSON);
                var contactList = document.querySelector("section.content ul");
                var contacts = categoryJSON.contacts;
                var contactLi = document.createElement("li");
                $.each(contacts, 
                  function(idx, contact) {
                    
                    var contactSection = document.createElement("section");
                    var contactId = contact.id;
                    contactLi.id = contactId;

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

                    contactSection.appendChild(contactImg);
                    contactSection.appendChild(contactHeader);
                    contactSection.appendChild(agePara);
                    contactSection.appendChild(numberPara);
                    contactSection.appendChild(addressPara);

                    contactLi.appendChild(contactSection);
                  });
                contactList.appendChild(contactLi);
              }); 
          });
          $categoryNav.append(categoryButton);
        });
    });
});