window.ResumeStyles = window.ResumeStyles || {};
window.ResumeStyles['vermillion'] = `
@font-face {
    font-family: "OpenSans";
    src: url("../../fonts/OpenSans-Regular.ttf");
}
body{
    width:800px;
    margin-left: auto;
    margin-right: auto;
    font-family: OpenSans, Helvetica, sans-serif;
    font-size:10pt;
    color: rgb(66, 66, 66);
    margin:35pt auto 100pt auto;
}

/*This is resume-building breaking*/
#rb-printable-resume{
    
}
#rb-resume{
    display: flex;
    align-items: stretch;
    flex-direction: row;
}
ul{
    margin-top: 0;
    margin-bottom:0;
}
li{
    margin-top: 0.2rem;
}
#rb-contact-info{
    flex: 1;
    margin-right: 10pt;
    margin-left: 10pt;
    font-weight: bold;
}
#rb-name{
    font-size:30pt;
    color:#ac3125;
}
#rb-resume-content{
    /* going to consider changing this to a dynamic div when we use jQuery */
    flex: 10;
    margin-right: 10pt;
}

.rb-section-header{
    color:#ac3125;
    font-size: larger;
    font-weight: bold;
    border-bottom: solid 1px;
    text-transform: uppercase;
}

.rb-school-name,.rb-job-title{
    font-weight: bold;
    font-size:larger;
    /* flex-basis:70%; */
    text-decoration:underline;
}
.rb-list-title,.rb-activity-title,.rb-title{
    font-weight:bold;
    text-decoration:underline;
}
.rb-company-name{
    flex-basis:70%;
}
.rb-company,.rb-activity{
    margin-bottom:10pt;
}
.rb-job-dates{
    flex-basis:20%;
}
.rb-essentials,.rb-skill-lists{
    flex-wrap: wrap; 
    display: flex;
    align-items: stretch;
    flex-grow: 1;
}
ul>.rb-bold,.rb-company-name,.rb-major{
    font-weight: bold;
}
/* .rb-essentials .rb-title{
    flex-basis:80%;
    
} */
.rb-essentials>div:nth-child(odd){
    flex-basis:70%;
}
.rb-essentials>div:nth-child(even){
    flex-basis:30%;
}


.rb-hide{
    display: none;
}
.rb-skill-lists>ul{
    /* not sure why it needs to be less than 50, it has no margins */
    flex-basis:42%;
}

.rb-school-location,.rb-date,.rb-location{
    text-align: right;
    font-weight: bold;
    /* flex-grow: 1; */
}

`;

window.ResumeStyles['standard'] = `
    
body{
    align-items: stretch;
    flex-direction: row;
    width:800px;
    font-size:12pt;
    color: rgb(66, 66, 66);
    
    margin:35pt auto 100pt auto;
}
ul{
    margin-top: 0;
}
#contact-info{
    text-align: center;
    margin-right: 10pt;
    margin-left: 10pt;
}
#contact-info>div:not(#name){
    display:inline;
    
}
#contact-info>div:not(#name):not(#phone-number){
    padding-left:5pt;
    border-left: solid black 1px; 
}


#name{
    font-size:30pt;
}
#resume-content{
    /* going to consider changing this to a dynamic div when we use jQuery */
    margin-right: 10pt;
}
.section{
    margin-top:10pt;
}
.section-header{
    font-size: 18pt;
    font-weight: bold;
    border-bottom: solid 1px;
    margin-bottom:5pt;
    font-family: Helvetica, sans-serif;
}
.company-name,.school-name{
    font-weight: bold;
    font-size:larger;
}
.job-title,.list-title,.activity-title{
    font-weight:bold;
}
.company-name{
    flex-basis:80%;
}
.company{
    margin-bottom:10pt;
}
.job-dates{
    flex-basis:20%;
    text-align:right;
}
.essentials,.skill-lists{
    flex-wrap: wrap; 
    display: flex;
    font-family: Helvetica, sans-serif;
}
.essentials>div{
    flex-basis:50%;
}
.skill-lists>ul{
    /* not sure why it needs to be less than 50, it has no margins */
    flex-basis:42%;
}
.school-location,.date{
    text-align: right;
}
`;