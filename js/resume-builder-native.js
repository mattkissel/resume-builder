// const SortableMin = require("./Sortable-1.15.4/Sortable.js");

window.onload = function() {


  addSortableControls(document.getElementById('resume'));
  makeContentEditable(document);

//create sortable lists
const sortableLists = document.getElementsByClassName('sortable-list');

Array.from(sortableLists).forEach((sortableList) => {
    // var sortable = SortableMin.create(sortableList,{});
    new Sortable(sortableList,
      {
        filter: '.fixed', // Define a selector for fixed items
        preventOnFilter: false, // Allow clicks and interaction but no drag
        handle:'.handle',
        animation: 150
      }
    );
  });
}



// if we want to change styles before we download the resume
function loadNewStyles(){
    newStyle = document.getElementById("style-change").value;
    document.getElementById("resume-style").setAttribute("href","resume-styles/"+newStyle+".css")
}


// we have to add sortable for items we will need to call it again if we add more content
function addSortableControls(element)
{
  var controls = element.querySelectorAll(".controls");
  var controlTemplate = document.querySelector("#controls-template")
  console.log("conttemp: "+controlTemplate);
  controls.forEach((control) => {
    var clone = controlTemplate.content.cloneNode(true);
    control.append(clone);
  });

}
function makeContentEditable(element)
{
  // Make content editable
  element.querySelectorAll('*').forEach((e) => {
    if(e.children.length == 0 
      && !e.classList.contains("handle")
      && !e.classList.contains("delete-sortable"))
    {
      e.setAttribute('contenteditable', 'true');
    }
  });
}


// export the html that will be used in our document
function downloadResume(downloadNode){
    a = document.createElement("a");
    blob = new Blob(
      [document.getElementById("print-space").innerHTML],
      {type: "text/html"});
    object_URL = URL.createObjectURL(blob);
    a.href = object_URL;
    a.download = "test.html";
    a.click();
    URL.revokeObjectURL(object_URL);
};


function dropDown(dropDown) {
  dropDown.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
}

// window.onclick = function(event) {
//   if (!event.target.matches(".dropbtn")) {
//     var dropdowns = $(".dropdown-content");
//     for (let i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// }


function addItem(templateId, parentNode){
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if("content" in document.createElement("template"))
    {
      var template = document.getElementById(templateId);
    
      var clone = template.content.cloneNode(true);

      console.log("adding a new section...".templateId);

      makeContentEditable(clone);

      parentNode.append(clone);
    }
}