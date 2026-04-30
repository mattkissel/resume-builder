// js/templates.js
// Offline templates. All templates are strings keyed by name.
// Use data-template="<name>" to reference them.
window.ResumeTemplates = {
  "resume-shell":`
  <link rel="stylesheet" id="rb-resume-style" href="css/resume-styles/vermillion.css">
  <link rel="stylesheet" href="css/resume-builder.css">
  <style>
    @font-face {
      font-family: 'OpenSans';
      src: url('fonts/OpenSans-Regular.ttf');
    }
  </style>
  <div id="rb-resume">
    <div id="rb-contact-info">
      <div id="rb-name" data-placeholder="FirstName Lastname" contenteditable="true" ></div>
      <div id="rb-phone-number" data-placeholder="###-####-####" contenteditable="true" ></div>
      <div id="rb-email" data-placeholder="youremail@domain.com" contenteditable="true" ></div>
      <div id="rb-website" data-placeholder="https://www.fakesite.com/" contenteditable="true" ></div>
    </div>
    <!-- could consider renaming this since contact info is sort of content -->
    <div id="rb-resume-content" class="rb-sortable-list">
      <!-- sections go here -->
    </div>
  </div>
  `,
  // SECTION TEMPLATES (one of each)
  "education-section": `
<section class="rb-section rb-education" data-type="education">
  <div class="rb-controls"></div>
  <h2 class="rb-section-header">Education</h2>
  <div class="rb-schools-list rb-sortable-list">
    <!-- existing entries will be inserted here -->
  </div>
  <div class="rb-section-actions">
    <button type="button" class="rb-btn-add" data-action="add-entry" data-template="school-entry">Add School</button>
  </div>
</section>
`,

  "work-section": `
<section class="rb-section rb-work-experience" data-type="work-experience">
  <div class="rb-controls"></div>
  <h2 class="rb-section-header">Work Experience</h2>
  <div class="rb-companies-list rb-sortable-list">
    <!-- job entries go here -->
  </div>
  <div class="rb-section-actions">
    <button type="button" class="rb-btn-add" data-action="add-entry" data-template="job-entry">Add Job</button>
  </div>
</section>
`,

  "skills-section": `
<section class="rb-section rb-skills" data-type="skills">
  <div class="rb-controls"></div>
  <h2 class="rb-section-header">Skills</h2>
  <ul class="rb-skill-list rb-sortable-list">
    <!-- skill items here -->
  </ul>
  <div class="rb-section-actions">
    <button type="button" class="rb-btn-add" data-action="add-entry" data-template="skill-item">Add Skill</button>
  </div>
</section>
`,

  "activities-section": `
<section class="rb-section rb-activities" data-type="activities">
  <div class="rb-controls"></div>
  <h2 class="rb-section-header">Activities</h2>
  <div class="rb-activities-list rb-sortable-list"></div>
  <div class="rb-section-actions">
    <button type="button" class="rb-btn-add" data-action="add-entry" data-template="activity-entry">Add Activity</button>
  </div>
</section>
`,

  // ENTRY TEMPLATES (repeatable items inside sections)
  "school-entry": `
<div class="rb-school rb-entry">
  <div class="rb-controls"></div>
  <div class="rb-essentials">
    <div class="rb-school-name" data-placeholder="University/School Name"contenteditable="true"></div>
    <div class="rb-location" data-placeholder="City, State, Country" contenteditable="true"></div>
    <div class="rb-major" data-placeholder="BS in Major/Program" contenteditable="true"></div>
    <div class="rb-date" data-placeholder="2000 - 2050" contenteditable="true"></div>
  </div>
  <div class="rb-minor" data-placeholder="Minor: Your College Minor or some certificate" contenteditable="true"></div>
  <div class="rb-gpa" data-placeholder="GPA:0.0/0.0" contenteditable="true"></div>
  <div class="rb-description" 
  data-placeholder="Add a description here, eg. 2005 - Summer study abroad in Spain, where I mostly didn't study" 
  contenteditable="true"></div>
  <div class="rb-entry-actions">
    <button type="button" data-action="remove-entry">Remove</button>
  </div>
</div>
`,

  "job-entry": `
<div class="rb-company rb-entry">
  <div class="rb-controls"></div>
  <div class="rb-essentials">
    <div class="rb-job-title rb-title" data-placeholder="Your Job Title Here" contenteditable="true"></div>
    <div class="rb-job-dates rb-date" data-placeholder="10/2000 - 10/2000" contenteditable="true"></div>
    <div class="rb-company-name" data-placeholder="Company Name Here" contenteditable="true" ></div>
    <div class="rb-location" data-placeholder="City, State, Country" contenteditable="true"></div>
  </div>
  <div class="rb-description" data-placeholder="Optional short description" contenteditable="true"></div>

  <ul class="rb-responsibilities rb-sortable-list">
    <!-- responsibilities inserted here -->
  </ul>

  <div class="rb-entry-actions">
    <button type="button" 
    data-action="add-entry" 
    data-template="responsibility-item" 
    data-target=".rb-responsibilities">
      Add Responsibility 
    </button>
    <button type="button" data-action="remove-entry">Remove Job</button>
  </div>
</div>
`,

  "responsibility-item": `
<li class="rb-responsibility-item">
  <span contenteditable="true">Responsibility or achievement</span>
  <span class="rb-controls"></span>
</li>
`,

  "skill-item": `
<li class="rb-skill-item"><span contenteditable="true" data-placeholder="New Skill"></span>
  <span class="rb-controls"></span>
</li>
`,

  "activity-entry": `
<div class="rb-activity rb-entry">
  <div class="rb-controls"></div>
  <div class="rb-essentials">
    <div class="rb-activity-title rb-title" contenteditable="true" data-placeholder="Title of your Activity"></div>
    <div class="rb-date" data-placeholder="10/2000 - 10/2000" contenteditable="true"></div>
    <div class="rb-company-name" data-placeholder="Organization Name" contenteditable="true"></div>
    <div class="rb-location" data-placeholder="City, State, Country" contenteditable="true"></div>
  </div>
  <div class="rb-description" data-placeholder="Short summary" contenteditable="true"></div>
  <div class="rb-entry-actions">
    <button type="button" data-action="remove-entry">Remove</button>
  </div>
</div>
`
};
