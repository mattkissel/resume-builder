// const SortableMin = require("./Sortable-1.15.4/Sortable.js");
const TEMPLATE_HTML_PATH = "content-templates.html";

window.onload = function() {
  loadTemplateHTML();
  
  var resume = document.getElementById('resume')
  setupElement(resume);
  // makeListsSortable(resume); //TODO we should add this into setup element somehow, it only wor

  setupLoadButton();
}// END WINDOW ONLOAD

function addListItems(element, templateId)
{
  let temp = document.querySelector(templateId)
  console.log("templateId "+templateId);
  let clone = temp.content.cloneNode(true);
  setupElement(clone);

  element.parentElement.insertBefore(clone, element);
}


// if we want to change styles before we download the resume
function loadNewStyles(){
    newStyle = document.getElementById("style-change").value;
    document.getElementById("resume-style").setAttribute("href","resume-styles/"+newStyle+".css")
}
function loadTemplateHTML()
{
  const templateDiv = document.createElement("div"); 
  templateDiv.innerHTML = templateHTML;
  document.body.appendChild(templateDiv); 
}

function setupLoadButton()
{
  const loadButton = document.querySelector('#load-button');
  const fileInput = document.querySelector('#file-input');
  const targetElement = document.querySelector('#resume');

  // Add event listener to the load button
  loadButton.addEventListener('click', () => {
    fileInput.click(); // Trigger the file input dialog
  });

  // Add event listener to handle file selection
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the selected file
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const fileContent = e.target.result; // Read file content as a string
        
        // Create a temporary DOM parser to parse the file content as html
        const parser = new DOMParser();
        const doc = parser.parseFromString(fileContent, 'text/html');
        
        const loadedResume = doc.querySelector('#resume');
        
        if (loadedResume) {
          // Clone the element and insert it into the current document
          targetElement.innerHTML = '';
          const clonedElement = loadedResume.cloneNode(true);
          setupElement(clonedElement);
          targetElement.appendChild(clonedElement);
          
        } else {
          targetElement.innerHTML = '<p>No element with the specified ID found in the file.</p>';
        }
      };

      reader.onerror = () => {
        console.error('Error reading file.');
      };

      reader.readAsText(file); // Read the file content as plain text
    }
  });
  
}
function setupElement(element)
{
  addSortableControls(element);
  makeContentEditable(element);
  addHideToggleEvent(element);
  makeListsSortable(element);
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
      && !e.classList.contains("hide-toggle")
      && !e.classList.contains("delete-sortable")
      && e.tagName !== 'BUTTON')
    {
      e.setAttribute('contenteditable', 'true');
    }
  });
}
function makeListsSortable(element){
  console.log("calling make sortable with " + element);
  let sortableLists = null;
  if(element instanceof DocumentFragment)
  {
    //if it's a fragment we are setting up from a template and we need to search till we find a possible list
    const childElements = element.querySelectorAll('*'); 
  
    // Find the first element with class 'sortable-list'
    for (let child of childElements) 
    {
      if (child.classList.contains('sortable-list')) 
        {
        //we put in in [] to make an HTMLCollection so that the later for loop will process correctly
        sortableLists = [child];
        break;
      }
    }
    
    if (!sortableLists) 
      {
      console.log("No sortable list found in the fragment");
    }
  }
  else
  {
    console.log("get elemen");
    sortableLists = element.getElementsByClassName('sortable-list');
  }

  
  if(sortableLists)
  {
    console.log("attempting loop");
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