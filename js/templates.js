// js/templates.js
// Offline templates. All templates are strings keyed by name.
// Use data-template="<name>" to reference them.
window.ResumeTemplates = {
  // SECTION TEMPLATES (one of each)
  "education-section": `
<section class="section education" data-type="education">
  <div class="controls"></div>
  <h2 class="section-header">Education</h2>
  <div class="schools-list sortable-list">
    <!-- existing entries will be inserted here -->
  </div>
  <div class="section-actions">
    <button type="button" class="btn-add" data-action="add-entry" data-template="school-entry">Add School</button>
  </div>
</section>
`,

  "work-section": `
<section class="section work-experience" data-type="work-experience">
  <div class="controls"></div>
  <h2 class="section-header">Work Experience</h2>
  <div class="companies-list sortable-list">
    <!-- job entries go here -->
  </div>
  <div class="section-actions">
    <button type="button" class="btn-add" data-action="add-entry" data-template="job-entry">Add Job</button>
  </div>
</section>
`,

  "skills-section": `
<section class="section skills" data-type="skills">
  <div class="controls"></div>
  <h2 class="section-header">Skills</h2>
  <ul class="skill-list sortable-list">
    <!-- skill items here -->
  </ul>
  <div class="section-actions">
    <button type="button" class="btn-add" data-action="add-entry" data-template="skill-item">Add Skill</button>
  </div>
</section>
`,

  "activities-section": `
<section class="section activities" data-type="activities">
  <div class="controls"></div>
  <h2 class="section-header">Activities</h2>
  <div class="activities-list sortable-list"></div>
  <div class="section-actions">
    <button type="button" class="btn-add" data-action="add-entry" data-template="activity-entry">Add Activity</button>
  </div>
</section>
`,

  // ENTRY TEMPLATES (repeatable items inside sections)
  "school-entry": `
<div class="school entry">
  <div class="controls"></div>
  <div class="essentials">
    <div class="school-name" contenteditable="true">University Name</div>
    <div class="location" contenteditable="true">City, Country</div>
    <div class="major" contenteditable="true">Major / Program</div>
    <div class="date" contenteditable="true">Year - Year</div>
  </div>
  <div class="minor" contenteditable="true">Minor / certificate</div>
  <div class="gpa" contenteditable="true">GPA: </div>
  <div class="description" contenteditable="true">Short description</div>
  <div class="entry-actions">
    <button type="button" data-action="remove-entry">Remove</button>
  </div>
</div>
`,

  "job-entry": `
<div class="company entry">
  <div class="controls"></div>
  <div class="essentials">
    <div class="job-title title" contenteditable="true">Job Title</div>
    <div class="job-dates date" contenteditable="true">Dates</div>
    <div class="company-name" contenteditable="true">Company</div>
    <div class="location" contenteditable="true">Location</div>
  </div>
  <div class="description" contenteditable="true">Short summary</div>

  <ul class="responsibilities sortable-list">
    <!-- responsibilities inserted here -->
  </ul>

  <div class="entry-actions">
    <button type="button" data-action="add-entry" data-template="responsibility-item">Add Responsibility</button>
    <button type="button" data-action="remove-entry">Remove Job</button>
  </div>
</div>
`,

  "responsibility-item": `
<li class="responsibility-item"><span contenteditable="true">Responsibility or achievement</span>
  <button type="button" data-action="remove-entry">✖</button>
</li>
`,

  "skill-item": `
<li class="skill-item"><span contenteditable="true">New Skill</span>
  <button type="button" data-action="remove-entry">✖</button>
</li>
`,

  "activity-entry": `
<div class="activity entry">
  <div class="controls"></div>
  <div class="essentials">
    <div class="activity-title title" contenteditable="true">Activity Title</div>
    <div class="date" contenteditable="true">Dates</div>
    <div class="company-name" contenteditable="true">Organization</div>
    <div class="location" contenteditable="true">Location</div>
  </div>
  <div class="description" contenteditable="true">Short details</div>
  <div class="entry-actions">
    <button type="button" data-action="remove-entry">Remove</button>
  </div>
</div>
`
};


const templateHTML = `





<template id="school-template">
    <div class="school">
        <span class="controls"></span>
        <div class="essentials">
            <div class="school-name"></div>
            <div class="location"></div>
            <div class="major"></div>
            <div class="date"></div>
        </div>
        <div class="minor"></div>
        <div class="gpa"></div>
        <div class="description"></div>
    </div>
</template>
    
<template id="work-template">
    <div class="section" id="work-experience">
        <span class="controls"></span>
        <div class="section-header">Work Experience</div>
        <div class="companies-list sortable-list">
            <div class="company">
            <span class="controls"></span>
                <div class="essentials">
                    <div class="job-title title"></div>
                    <div class="job-dates date"></div>
                    <div class="company-name"></div>
                    <div class="location"></div>  
                </div>
                <div class="description">Here's a description of what my general responsibilities were.</div>
                <ul class="sortable-list responsibilities">
                    <li><span>Important Project 1.</span><span class="controls"></span></li>
                    <li><span>Other Project 2</span><span class="controls"></span></li>
                    <button type="button" onclick="addListItems(this, '#job-list-item-template')">+</button>
                </ul>
            </div>
            <button type="button" onclick="addListItems(this, '#job-template')">+</button>
        </div>
    </div>
</template>
    
<template id="job-template">
    <div class="company">
        <span class="controls"></span>
        <div class="essentials">
            <div class="job-title title"></div>
            <div class="job-dates date"></div>
            <div class="company-name"></div>
            <div class="location"></div>
        </div>
        <div class="description">Here's a description of what my general responsibilities were.</div>
        <ul class="sortable-list responsibilities">
            <li><span>Important Project 1</span><span class="controls"></span></li>
            <li><span>Other Project 2</span><span class="controls"></span></li>
            <button type="button" onclick="addListItems(this, '#job-list-item-template')">+</button>
        </ul>
    </div>
</template>

<template id="job-list-item-template">
    <li><span>Important Project 1</span><span class="controls"></span></li>
</template>
        
    
    
    
<template id="activities-template">
    <div class="section" id="activites">
        <span class="controls"></span>
        <div class="section-header">Activities</div>
        <div class="activities-list sortable-list">
            <div class="activity">
                <span class="controls"></span>
                <div class="essentials" >
                    <div class="activity-title title">Fan of being a Fan Club</div>
                    <div class="date" >3/2004-3/2012</div>
                    <div class="company-name"><!-- Probably want to change this in the future --></div>
                    <div class="location"></div> 
                </div>
                <div class="description" >
                    It is a long established fact that a reader will be distracted by the readable content of a page 
                when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
                distribution of letters, as opposed to using 'Content here, content here', making it look like 
                readable English.
                </div>
            </div>
            <button type="button" onclick="addListItems(this, '#activity-template')">+</button>
        </div>
    </div>
</template>

<template id="activity-template">
    <div class="activity">
        <span class="controls"></span>
        <div class="essentials" >
            <div class="activity-title title">Fan of being a Fan Club</div>
            <div class="date" >3/2004-3/2012</div>
            <div class="company-name"><!-- Probably want to change this in the future --></div>
            <div class="location"></div> 
        </div>
        <div class="description" >
            It is a long established fact that a reader will be distracted by the readable content of a page 
        when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
        distribution of letters, as opposed to using 'Content here, content here', making it look like 
        readable English.
        </div>
    </div>
</template>


<template id="controls-template">
    <span class="handle">&#8645;</span><input type="checkbox" class="hide-toggle" checked><button class="delete-sortable" onclick="confirmDelete(this)">&#9747;</button>
</template>

<template id="skill-list-template">
    <ul class="skill-list sortable-list">
        <span class="controls"></span>
        <div class="bold title fixed">Language Skills</div>
        <li><span>Russian - Beginner</span><span class="controls"></span></li>
        <li><span>English - Native</span><span class="controls"></span></li>
        <li><span>Spanish - Intermediate</span><span class="controls"></span></li>
        <button type="button" onclick="addListItems(this, '#skill-list-item-template')">+</button>
    </ul>
</template>

<template id="skill-list-item-template">
        <li><span>Insert Skill Name here</span><span class="controls"></span></li>
</template>

`;