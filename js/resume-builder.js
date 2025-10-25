// const SortableMin = require("./Sortable-1.15.4/Sortable.js");
const TEMPLATE_HTML_PATH = "content-templates.html";



// js/resume-builder.js
// Assumes templates.js (window.ResumeTemplates) is loaded BEFORE this script.

(function () {
  // helper
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    initFromExisting();
    setupGlobalClickHandlers();
    observeAddsForSortables();
  });

  function initFromExisting() {
    // Initial setup for any controls and sortable lists already in the page
    // Add controls for existing sections if empty
    const resume = $('#resume');
    if (!resume) return;

    // If there are no main sections present, we may optionally insert defaults:
    // For compatibility with your existing HTML, don't overwrite. Just wire up sortables.
    makeListsSortable(document);
    addControlsToAll();
  }

  function addControlsToAll() {
    // Add control UI to any element that has a .controls placeholder
    $$('.controls').forEach(ctrl => {
      if (ctrl.dataset.hasControls) return;
      ctrl.dataset.hasControls = '1';
      // Use a simple handle, a checkbox to hide, and a delete button
      ctrl.insertAdjacentHTML('beforeend', `
        <span class="handle" title="Drag to reorder">&#8645;</span>
        <label class="hide-label"><input type="checkbox" class="hide-toggle" checked /></label>
        <button type="button" class="delete-sortable" data-action="remove-entry" title="Remove">&#9747;</button>
      `);
    });
  }

  // Global click handlers (event delegation)
  function setupGlobalClickHandlers() {
    document.body.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      if (action === 'add-entry') {
        const templateName = btn.dataset.template;
        if (!templateName || !window.ResumeTemplates || !window.ResumeTemplates[templateName]) {
          console.warn('Template not found:', templateName);
          return;
        }
        addEntry(btn, templateName);
      } else if (action === 'remove-entry') {
        removeEntry(ev.target);
      } else {
        // other actions can be handled here
      }
    });

    // Toggle hide toggle (checkbox inside .controls)
    document.body.addEventListener('change', (ev) => {
      if (!ev.target.matches('.hide-toggle')) return;
      const checked = ev.target.checked;
      // The controls container is likely inside the immediate entry/section
      const entry = ev.target.closest('.entry, .section, .company, .school, .activity');
      if (entry) {
        entry.classList.toggle('do-not-export', !checked);
        entry.classList.toggle('hidden', !checked); // visual
      }
    });

    // Make contenteditable behavior: already set in templates via attribute
  }

  // Insert an entry based on a clicked button and a template name
  function addEntry(button, templateName) {
  const templateHtml = window.ResumeTemplates[templateName];
  if (!templateHtml) return;

  // Find the section that contains the button (if any)
  const section = button.closest('.section');

  // Look for a sensible insert target inside the section (prefer lists)
  let insertTarget = null;
  if (section) {
    insertTarget = section.querySelector(
      '.schools-list, .companies-list, .activities-list, .responsibilities, .skill-list, .sortable-list'
    );
  }

  // If no section or no inner list, default to #resume (always safe)
  if (!insertTarget) {
    insertTarget = document.querySelector('#resume-content');
  }

  // Parse template HTML into nodes
  const tpl = document.createElement('template');
  tpl.innerHTML = templateHtml.trim();
  const newNodes = tpl.content.cloneNode(true);

  // If insert target is a UL/OL, append list items, otherwise append or insertBefore
  if (insertTarget.tagName && /^(UL|OL)$/i.test(insertTarget.tagName)) {
    // If template root is li, append directly; otherwise wrap children in li
    const first = newNodes.firstElementChild;
    if (first && first.tagName.toLowerCase() === 'li') {
      insertTarget.appendChild(newNodes);
    } else {
      const wrapper = document.createElement('li');
      // move children into wrapper
      while (tpl.content.firstChild) {
        wrapper.appendChild(tpl.content.firstChild);
      }
      insertTarget.appendChild(wrapper);
    }
  } else {
    // Append before the button if the button is inside the insertTarget, otherwise append to insertTarget
    if (insertTarget.contains(button)) {
      insertTarget.insertBefore(newNodes, button);
    } else {
      insertTarget.appendChild(newNodes);
    }
  }

  // Post-insert initialisation
  makeListsSortable(insertTarget);
  addControlsToAll();
}


  function removeEntry(target) {
    // Called when clicking remove button (or delete-sortable)
    // If remove button is inside li, remove li; otherwise remove closest entry/section
    const li = target.closest('li');
    if (li && li.parentElement) {
      li.remove();
      return;
    }
    const entry = target.closest('.entry, .company, .school, .activity, .section');
    if (entry) entry.remove();
  }

  // Sortable wiring; works when Sortable is present globally.
  function makeListsSortable(root) {
    // root can be document, element, or section
    const lists = (root === document) ? $$('.sortable-list') : $$('.sortable-list', root);
    if (!lists.length) return;

    lists.forEach(list => {
      // Avoid double-initializing: mark when we've created Sortable for a list
      if (list.dataset.sortableInitialized) return;
      list.dataset.sortableInitialized = '1';

      // If Sortable exists globally (from your local Sortable.js), initialize it.
      if (window.Sortable) {
        try {
          new Sortable(list, {
            handle: '.handle',
            animation: 150,
            filter: '.fixed',
            preventOnFilter: false
          });
        } catch (e) {
          console.warn('Sortable init failed', e);
        }
      }
    });
  }

  // MutationObserver to watch for new nodes and init sortables etc.
  function observeAddsForSortables() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => {
        if (!m.addedNodes || !m.addedNodes.length) return;
        m.addedNodes.forEach(node => {
          if (!(node instanceof Element)) return;
          // If new node contains sortable-list(s), init them
          if (node.querySelector && node.querySelector('.sortable-list')) {
            makeListsSortable(node);
          }
          // also add controls for newly added .controls placeholders
          if (node.querySelector && node.querySelector('.controls')) {
            addControlsToAll();
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Small utility to programmatically insert a main section (if you want)
  window.addMainSection = function (sectionTemplateName, target = '#resume-content') {
    const html = window.ResumeTemplates[sectionTemplateName];
    if (!html) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const node = tpl.content.cloneNode(true);
    document.querySelector(target).appendChild(node);
    addControlsToAll();
    makeListsSortable(document.querySelector(target));
  };

})();



// window.onload = function() {
//   loadTemplateHTML();
  
//   var resume = document.getElementById('resume')
//   setupElement(resume);
//   // makeListsSortable(resume); //TODO we should add this into setup element somehow, it only wor

//   setupLoadButton();
// }// END WINDOW ONLOAD



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
    // cleanedPrint.querySelectorAll('input[type="checkbox"]:not(:checked)').forEach(
    //   (el) => {
    //     console.log("found element " + el);
    //     el.parentElement.parentElement.remove();
    // });
    cleanedPrint.querySelectorAll('.do-not-export').forEach((el) => {
          console.log("found element " + el);
          el.remove();
      });
    //we need to remove all the controls and buttons
    cleanedPrint.querySelectorAll(".controls").forEach((el) => el.remove());
    cleanedPrint.querySelectorAll("button").forEach((el) => el.remove());
    cleanedPrint.querySelectorAll("*").forEach((el) => {
      el.removeAttribute("style");
    });


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



function addItemToTarget(templateId, parentNode){
    // Test to see if the browser supports the HTML template element by checking
    // for the presence of the template element's content attribute.
    if("content" in document.createElement("template"))
    {
      var template = document.querySelector(templateId);
    
      var clone = template.content.cloneNode(true);

      console.log("adding a new section...".templateId);
      setupElement(clone);

      parentNode.append(clone);
    }
}

function addListItems(element, templateId)
{
  // Test to see if the browser supports the HTML template element by checking
  // for the presence of the template element's content attribute
  if("content" in document.createElement("template"))
  {
    let temp = document.querySelector(templateId)
    console.log("adding template of id "+templateId);

    let clone = temp.content.cloneNode(true);
    setupElement(clone);
    element.parentElement.insertBefore(clone, element);
  }
}
