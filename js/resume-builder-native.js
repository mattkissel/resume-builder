// const SortableMin = require("./Sortable-1.15.4/Sortable.js");

window.onload = function() {


// Get the #resume element
const resume = document.getElementById('resume');
console.log("resume :"+resume);
// Function to wrap text nodes in a span with contenteditable
function makeTextNodesEditable(parent) {

  parent.querySelectorAll('*').forEach((element) => {
    console.log(element.tagName + " with children " + element.children.length ); // Logs tag names of all descendant elements
    if(element.children.length == 0 && !element.classList.contains("handle"))
    {
      element.setAttribute('contenteditable', 'true');
    }
  });

}

// const parent = document.getElementById('resume');

// Array.from(parent.children).forEach((child) => {
//   console.log(child.tagName); // Logs tag names of child elements
// });
//   parent.childNodes.forEach((node) => {
//     if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
//       // Create a span to wrap the text node
//       const span = document.createElement('span');
//       span.setAttribute('contenteditable', 'true');
//       span.textContent = node.nodeValue;
//       parent.replaceChild(span, node);
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       // Recursively apply to child elements
//       makeTextNodesEditable(node);
//     }
//   });
// }

// Apply to #resume
makeTextNodesEditable(resume);


const sortableList = document.getElementsByClassName('sortable-list')[0];
// var sortable = SortableMin.create(sortableList,{});
new Sortable(sortableList,
  {
    handle:'.handle',
    animation: 150
  }
);
};

// if we want to change styles before we download the resume
function loadNewStyles(){
    newStyle = document.getElementById("style-change").value;
    document.getElementById("resume-style").setAttribute("href","resume-styles/"+newStyle+".css")
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
  $(".dropdown-content")[0].classList.toggle("show");
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

// this is the html to create a dropdown
/* <div class="dropdown">
<button onclick="dropDown(this.parentNode)" class="dropbtn">+</button>
<div id="myDropdown" class="dropdown-content">
    <a href="#" onclick="addItem(this)" class="add-section">Add New Section</a>
    <a href="#" onclick="addItem(this)" class="add-section">Link 2</a>
    <a href="#" onclick="addItem(this)" class="add-section">Link 3</a>
</div>
</div> */
function addItem(templateId, parentId){
  // console.log($(itemType).attr("class"));
  // switch($(itemType).attr("class")){
  //   case "add-section":
  //     var template = $("#education-template").html();
  //     console.log("adding a new section...education");
  //     console.log($(itemType).parent().parent());
  //     $(itemType).parent().parent().before(template);
  //     break;
  //   case "add-something-else":
  //     // code block
  //     break;
  //   default:
  //     console.log("we've added an invalid class");
  // }


    var template = $(templateId).html();
    console.log("adding a new section...".templateId);
    //console.log($(itemType).parent().parent());
    //$(itemType).parent().parent().before(template);
    $(parentId).append(template)
  // var temp = document.getElementsByTagName("template")[0];
  // var clon = temp.content.cloneNode(true);
  // document.body.appendChild(clon);

}