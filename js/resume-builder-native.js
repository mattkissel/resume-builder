// const SortableMin = require("./Sortable-1.15.4/Sortable.js");

window.onload = function() {

  var resume = document.getElementById('resume')
  setupElement(resume);
  makeListsSortable(resume);
  makeContentEditable(resume);
}// END WINDOW ONLOAD

function addListItems(element, templateId)
{
  let temp = document.querySelector(templateId)
  console.log("templateId "+templateId);
  let clone = temp.content.cloneNode(true);
  setupElement(clone);
  element.parentElement.insertBefore(clone, element);
  if(element.classList.contains("sortable-list"))
  {
    makeListsSortable(element);
  }
}


// if we want to change styles before we download the resume
function loadNewStyles(){
    newStyle = document.getElementById("style-change").value;
    document.getElementById("resume-style").setAttribute("href","resume-styles/"+newStyle+".css")
}

function setupElement(element)
{
  addSortableControls(element);
  makeContentEditable(element);
  addHideToggleEvent(element);
}

// we have to add sortable for items we will need to call it again if we add more content
function addSortableControls(element)
{
  var controls = element.querySelectorAll(".controls");
  
  var controlTemplate = document.querySelector("#controls-template");

  controls.forEach((control) => {
    if(control.children.length > 0)
    {
      return;
    }
    var clone = controlTemplate.content.cloneNode(true);
    control.append(clone);
  });

}
function addHideToggleEvent(element)
{
  // add an event listener to change the style of objects based on whether 
  // or not they are excluded
  element.querySelectorAll('.hide-toggle').forEach((checkbox) => {
    checkbox.addEventListener('change', function () {
      if (this.checked) 
      {
        this.parentElement.parentElement.classList.remove('do-not-export'); // Remove the hide class if checked
      } 
      else 
      {
        this.parentElement.parentElement.classList.add('do-not-export'); // Add the hide class if unchecked
      }
    });
  });
}
function makeContentEditable(element)
{
  // Make content editable
  element.querySelectorAll('*').forEach((e) => {
    
    if(e.children.length == 0 
      && !e.classList.contains("handle")
      && !e.classList.contains("delete-sortable")
      && e.tagName !== 'BUTTON')
    {
      console.log("setting editable "+ e)
      e.setAttribute('contenteditable', 'true');
    }
  });
}
function makeListsSortable(element){
  //create sortable lists
const sortableLists = element.getElementsByClassName('sortable-list');

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


// export the html that will be used in our document
function downloadResume(downloadNode){
    const printSpace = document.getElementById("print-space");
    let cleanedPrint = printSpace.cloneNode(true);
    
    //if the display checkboxes aren't checked we don't want to export them to the resume
    // they are in the controls so we need to check this before removing controls
    cleanedPrint.querySelectorAll('input[type="checkbox"]:not(:checked)').forEach(
      (el) => {
        console.log("found element " + el);
        el.parentElement.parentElement.remove();
    });

    //we need to remove all the controls and buttons
    cleanedPrint.querySelectorAll(".controls").forEach((el) => el.remove());
    cleanedPrint.querySelectorAll("button").forEach((el) => el.remove());
    blob = new Blob(
      [cleanedPrint.innerHTML],
      {type: "text/html"});
    
    //triggers the download with default name
    a = document.createElement("a");
    const object_URL = URL.createObjectURL(blob);
    a.href = object_URL;
    a.download = "test.html";
    a.click();

    //Frees the memory
    URL.revokeObjectURL(object_URL);
};
// export the html that will be used in our document
function saveBaseResume(){
  a = document.createElement("a");
  blob = new Blob(
    [document.documentElement.innerHTML],
    {type: "text/html"});
  object_URL = URL.createObjectURL(blob);
  a.href = object_URL;
  a.download = "your_base_resume.html";
  a.click();
  URL.revokeObjectURL(object_URL);
};

function confirmDelete(target){
  if (confirm("Are you sure you want to delete this item?")) 
  {
    // remove parent
    target.parentElement.parentElement.remove();
  }
}

function dropDown(dropDown) {
  dropDown.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
}



function addItem(templateId, parentNode){
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if("content" in document.createElement("template"))
    {
      var template = document.getElementById(templateId);
    
      var clone = template.content.cloneNode(true);

      console.log("adding a new section...".templateId);
      addSortableControls(clone);
      makeContentEditable(clone);


      parentNode.append(clone);
    }
}