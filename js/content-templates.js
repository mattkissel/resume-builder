// contains the templates for adding new sections
const templateHTML = `
<template id="education-template">
    <div class="section" id="education">
        <span class="controls"></span>
        <div class="section-header" >Education</div>
        <div class="schools-list sortable-list">
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
            <button type="button" onclick="addListItems(this, '#school-template')">+</button>
        </div>
    </div>
</template>



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