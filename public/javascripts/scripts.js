$(function() {
  getAllCatagories();
});

function getAllCatagories() {
  $.getJSON("/categories",
  null, 
  function(responseJSON){
    constructCatagoryViews(responseJSON);
  }); 
}

function constructCatagoryViews(arr) {
  $.each(arr, function(idx, catagoryObj){
    constructCatagoryView(catagoryObj);
  });
}

function constructCatagoryView(obj) {
  var catagoryId = obj.id; 
  var catagoryName = obj.name;

  var $catagoryList = $("section.categories ul");

  var $catagoryEntry = $("<li></li>");
  $catagoryEntry.attr("id", catagoryId);
  $catagoryEntry.text(catagoryName); 
  $catagoryEntry.click(function(){
    getAllContactsInCatagory(catagoryName, catagoryId); 
  });

  $catagoryList.append($catagoryEntry);
}

function getAllContactsInCatagory(name, id) {
  var $theSection = $("section.categories"); 
  $theSection.removeClass("categories");
  $theSection.addClass("contacts");
  $theSectionHeader = $("section.contacts h1");
  $theSectionHeader.text("Contacts in " + name);
  $theList = $("section.contacts ul");
  $theList.empty();
  $.getJSON(
    "/categories/" + id, 
    null,
    function(responseJSON) {
      var contacts = responseJSON.contacts;
      $.each(contacts, function(idx, contactObj) {
        constructContactView(contactObj);
      });
    }
  );
}

function constructContactView(obj) {
  var $theList = $("section.contacts ul");
  var $contactItem = $("<li></li>");
  $contactItem.attr("id", obj.id);
  $contactItem.text(obj.name);
  $contactItem.click(function() {
    console.log(obj.name); 
  });
  $theList.append($contactItem);
}