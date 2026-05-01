// const SortableMin = require("./Sortable-1.15.4/Sortable.js");
const TEMPLATE_HTML_PATH = "content-templates.html";



// js/resume-builder.js
// Assumes templates.js (window.ResumeTemplates) is loaded BEFORE this script.

(function () {
  let shadow;
  
  document.addEventListener('DOMContentLoaded', () => {
    const host = document.getElementById('rb-host');
    shadow = host.attachShadow({ mode: 'open' });
    
    // const content = shadow.querySelector('#rb-resume-content');
    // if (!content || content.children.length > 0) return;
    
    initFromExisting();
    setupGlobalClickHandlers();
    observeAddsForSortables();
    fullyClearContentEditables();
    setupToolbarHandlers();
    if (window.ResumeStylesReady) {
        // resume-styles-ready already fired before we got here
        loadDefaultStyle();
    } else {
        document.addEventListener('resume-styles-ready', loadDefaultStyle);
    }
  });
  // helper
  const $ = (sel, root = shadow) => root.querySelector(sel);
  const $$ = (sel, root = shadow) => Array.from(root.querySelectorAll(sel));

  

  function initFromExisting() {
    const shadowContents = document.getElementById('rb-shadow-contents');
    if (shadowContents) {
      //if there is a shadow contents elements, load it
      shadow.innerHTML = shadowContents.textContent;
      shadowContents.remove();
    }else{
      //if there is no existing content start fresh.
      buildDefaultResume()
    }

    makeListsSortable(shadow);
    addControlsToAll();
  }
  function fullyClearContentEditables(){
    shadow.addEventListener('input', (e) => {
      const target = e.target;
      
      // If the user deleted everything or it's just whitespace/breaks
      if (target.hasAttribute('contenteditable') && target.innerText.trim() === "") {
        target.innerHTML = ""; // Force it to be truly empty so :empty triggers
      }
    });
  }

  function addControlsToAll() {
    // Add control UI to any element that has a .controls placeholder
    $$('.rb-controls').forEach(ctrl => {
      if (ctrl.dataset.hasControls) return;
      ctrl.dataset.hasControls = '1';
      // Use a simple handle, a checkbox to hide, and a delete button
      // useful handle symbol:&#8645; or ≡ or ☰ (&#9776)
      ctrl.insertAdjacentHTML('beforeend', `
        <span class="rb-handle" title="Drag to reorder">&#9776;</span>
        <label class="rb-hide-label"><input type="checkbox" class="rb-hide-toggle" checked /></label>
        <button type="button" class="rb-delete-sortable" data-action="remove-entry" title="Remove">&#9747;</button>
      `);
    });
  }

  // Global click handlers (event delegation)
  function setupGlobalClickHandlers() {
    shadow.addEventListener('click', (ev) => {
      const btn = ev.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      if (action === 'add-entry') {
        const templateName = btn.dataset.template;
        if (!templateName || !window.ResumeTemplates || !window.ResumeTemplates[templateName]) {
          console.warn('Template not found:', templateName);
          return;
        }

        let insertTarget = null
        if (btn.dataset.target)
        {
          const scope = btn.closest(".rb-entry, rb-section");
          insertTarget = scope ? scope.querySelector(btn.dataset.target) : null;
        }
        if(!insertTarget)
        {
          //find the nearest list to insert into
          const section = btn.closest('.rb-section');
          insertTarget = section
            ? section.querySelector(".rb-sortable-list")
            : shadow.querySelector("#rb-resume-content");
        }
        addEntry(templateName, insertTarget);
      } else if (action === 'remove-entry') {
        removeEntry(ev.target);
      } else {
        // other actions can be handled here
      }
    });

    // Toggle hide toggle (checkbox inside .controls)
    shadow.addEventListener('change', (ev) => {
      if (!ev.target.matches('.rb-hide-toggle')) return;
      const checked = ev.target.checked;

      // The controls container is likely inside the immediate entry/section
      // controls div -> its parent is the actual thing to hide
      const controlsDiv = ev.target.closest('.rb-controls');
      const target = controlsDiv ? controlsDiv.parentElement : null;
      //const target = ev.target.closest('.rb-entry, .rb-section, .rb-company, .rb-school, .rb-activity');
      if (target) {
        target.classList.toggle('rb-do-not-export', !checked);
        target.classList.toggle('hidden', !checked); // visual
      }
    });

    // Make contenteditable behavior: already set in templates via attribute
  }

  // Insert an entry based on a clicked button and a template name
  function addEntry(templateName, insertTarget) {
    const templateHtml = window.ResumeTemplates[templateName];
    if (!templateHtml) return;

    const tpl = document.createElement('template');
    tpl.innerHTML = templateHtml.trim();
    const newNodes = tpl.content.cloneNode(true);

    // If insert target is a UL/OL, append list items, otherwise append or insertBefore
    if (/^(UL|OL)$/i.test(insertTarget.tagName)) {
      const first = tpl.content.firstElementChild;
      // If template root is li, append directly; otherwise wrap children in li
      if(first && first.tagName.toLowerCase() ==='li'){
        insertTarget.appendChild(newNodes)
      } else {
        const wrapper = document.createElement('li');
        // move children into wrapper
        while (tpl.content.firstChild) wrapper.appendChild(tpl.content.firstChild);
        insertTarget.appendChild(wrapper);
      }
    }else {
      insertTarget.appendChild(newNodes);
    }

  // Post-insert initialisation
  makeListsSortable();
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
    const entry = target.closest('.rb-entry, .rb-company, .rb-school, .rb-activity, .rb-section');
    if (entry) entry.remove();
  }

  // Sortable wiring; works when Sortable is present globally.
  function makeListsSortable(root = shadow) {
    // root can be document, element, or section
    // const lists = (root === document) ? $$('.rb-sortable-list') : $$('.rb-sortable-list', root);
    const lists = $$('.rb-sortable-list', root === shadow ? shadow : root);
    if (!lists.length) return;

    lists.forEach(list => {
      // Avoid double-initializing: mark when we've created Sortable for a list
      if (list.dataset.sortableInitialized) return;
      list.dataset.sortableInitialized = '1';

      // If Sortable exists globally (from your local Sortable.js), initialize it.
      if (window.Sortable) {
        try {
          new Sortable(list, {
            handle: '.rb-handle',
            animation: 150,
            filter: '.fixed',
            preventOnFilter: false,
            // append the drag ghost inside the shadow host so it inherits styles
            ghostClass: 'rb-sortable-ghost',
            fallbackOnBody: false,
            scroll: shadow  // if you need scroll support
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

          // if the node itself is a sortable list
          if (node.classList.contains('rb-sortable-list')) {
            makeListsSortable(node.parentElement);
          }

          // If new node contains sortable-list(s), init them
          if (node.querySelector('.rb-sortable-list')) {
            makeListsSortable(node);
          }
          // also add controls for newly added .controls placeholders
          if (node.querySelector('.rb-controls')) {
            addControlsToAll();
          }
        });
      });
    });
    observer.observe(shadow, { childList: true, subtree: true });
  }

  // Small utility to programmatically insert a main section (if you want)
  window.addMainSection = function (sectionTemplateName, target = '#rb-resume-content') {
    const html = window.ResumeTemplates[sectionTemplateName];
    if (!html) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const node = tpl.content.cloneNode(true);
    shadow.querySelector(target).appendChild(node);
    addControlsToAll();
    makeListsSortable(shadow.querySelector(target));
  };

  function buildDefaultResume() {
    shadow.innerHTML = window.ResumeTemplates['resume-shell'];
    // only build if resume-content is empty
    const content = shadow.querySelector('#rb-resume-content');
    if (!content || content.children.length > 0) return;
    // shadow.innerHTML = window.ResumeTemplates['resume-shell'];

    addMainSection('summary-section');
    addMainSection('education-section');
    const schoolsList = shadow.querySelector('.rb-schools-list');
    addEntry('school-entry', schoolsList);

    addMainSection('work-section');
    const companiesList = shadow.querySelector('.rb-companies-list');
    addEntry('job-entry', companiesList);

    addMainSection('skills-section');
    const skillList = shadow.querySelector('.rb-skill-list');
    addEntry('skill-item', skillList);

    addMainSection('activities-section');
    const activitiesList = shadow.querySelector('.rb-activities-list');
    addEntry('activity-entry', activitiesList);
  }


  
  function loadDefaultStyle(){
    // Initial load — apply default style
    //an existing style would be formatted as such
    //css/resume-styles/MY_STYLE.css
    const existingStylePath =  shadow.querySelector('#rb-resume-style').getAttribute('href');
    const existingStyleName = existingStylePath.replace(/^.*\/|\.css$/g, '');
    const defaultStyle =  existingStyleName ? existingStyleName : 'vermillion';
    loadResumeStyle(defaultStyle);

    // Populate dropdown from registered styles
    const select = document.getElementById('rb-style-change');
    Object.keys(window.ResumeStyles).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });

    select.addEventListener('change', () => {
        loadResumeStyle(select.value);
    });
  }
  // if we want to change styles before we download the resume
  function loadResumeStyle(newStyle){
    shadow.querySelector('#rb-resume-style')
      .setAttribute('href', 'css/resume-styles/' + newStyle + '.css');
    syncFontsForStyle(newStyle);
  }
  function syncFontsForStyle(styleName) {
      const meta = window.ResumeStylesMeta[styleName] || {};
      const fonts = meta.fonts || [];

      // Remove any previously injected theme fonts
      document.querySelectorAll('link[data-resume-font]').forEach(el => el.remove());

      // Add new ones
      fonts.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.setAttribute('data-resume-font', styleName);
          link.href = href;
          document.head.appendChild(link);
      });
  }
  function setupToolbarHandlers()
  {
    // document.getElementById('rb-style-change').addEventListener('change', loadResumeStyle );
  
    document.getElementById('rb-resume-save-all').addEventListener('click', saveResumeTemplate);
    document.getElementById('rb-export-resume').addEventListener('click', exportHTMLResume);

    
  }




  // export the html that will be used in our document
  function saveResumeTemplate(){
    // clone the shadow contents and strip initialization markers
    // if we don't the sortable will not initialize properly
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = shadow.innerHTML;
    tempDiv.querySelectorAll('[data-sortable-initialized]')
      .forEach(el => el.removeAttribute('data-sortable-initialized'));
    // tempDiv.querySelectorAll('[data-has-controls]')
    //   .forEach(el => el.removeAttribute('data-has-controls'));
      tempDiv.querySelectorAll('[data-sortable-initialized]')
    .forEach(el => el.removeAttribute('data-sortable-initialized'));

    // strip injected control contents but leave the empty .rb-controls div
    tempDiv.querySelectorAll('.rb-controls').forEach(el => {
      el.removeAttribute('data-has-controls');
      el.innerHTML = '';
    });


    //store the shadow contents in a script tag to restore next load
    //otherwise innerHTML of document will just ignore the shadow dom
    const shadowContents = document.createElement('script');
    shadowContents.id = 'rb-shadow-contents';
    shadowContents.type = 'text/shadow-content'; //a fake type will be ignored by the browser i.e. not executed
    shadowContents.textContent = tempDiv.innerHTML;
    document.body.appendChild(shadowContents);
    

    a = document.createElement("a");
    blob = new Blob(
      [document.documentElement.innerHTML],
      {type: "text/html"});

    object_URL = URL.createObjectURL(blob);
    a.href = object_URL;
    a.download = "my_resume.builder.html";
    a.click();
    URL.revokeObjectURL(object_URL);

    shadowContents.remove();
  };

// export the html that will be used in our document
async function exportHTMLResume(downloadNode){
  //changed this to rb-host
    const resumeElement = shadow.querySelector("#rb-resume");
    let cleanedPrint = resumeElement.cloneNode(true);
    
    //if the display checkboxes aren't checked we don't want to export them to the resume
    // they are in the controls so we need to check this before removing controls
    // cleanedPrint.querySelectorAll('input[type="checkbox"]:not(:checked)').forEach(
    //   (el) => {
    //     console.log("found element " + el);
    //     el.parentElement.parentElement.remove();
    // });
    cleanedPrint.querySelectorAll('.rb-do-not-export').forEach((el) => { el.remove(); });
    //we need to remove all the controls and buttons
    cleanedPrint.querySelectorAll(".rb-controls").forEach((el) => el.remove());
    cleanedPrint.querySelectorAll("button").forEach((el) => el.remove());
    cleanedPrint.querySelectorAll("*").forEach((el) => { el.removeAttribute("style"); });
    
    // remove effectively empty contenteditable elements
    cleanedPrint.querySelectorAll('[contenteditable]').forEach(el => {
      if (isEffectivelyEmpty(el)) el.remove();
      el.removeAttribute('contenteditable');
    });


    // Inline the CSS so the exported file is self-contained
    // get the current CSS from the Selector
    const cssStyleName = document.getElementById("rb-style-change").value;;
    const cssText = await getCSSAsText(cssStyleName); // fetch your stylesheet text

    const html = `<!DOCTYPE html>
    <html><head><style>${cssText}</style></head>
    <body>${cleanedPrint.outerHTML}</body></html>`;

    blob = new Blob([html], {type: "text/html"});
    
    //triggers the download with default name
    a = document.createElement("a");
    const object_URL = URL.createObjectURL(blob);
    a.href = object_URL;
    a.download = "resume.html";
    a.click();

    //Frees the memory
    URL.revokeObjectURL(object_URL);
};


})();




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


function getCSSAsText(styleName = 'vermillion') {
  console.log("found "+ window.ResumeStyles[styleName]);
  return window.ResumeStyles[styleName] || '';
}

function confirmDelete(target){
  if (confirm("Are you sure you want to delete this item?")) 
  {
    // remove parent
    target.parentElement.parentElement.remove();
  }
}



function isEffectivelyEmpty(el) {
  //return el.innerText.trim() === '';
  return el.textContent.trim() === '' && !el.querySelector('img, video, embed');
}
