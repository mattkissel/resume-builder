$(document).ready(function(){
  // set each of the tags without a child tag (i.e.) text
  // to be editable
  $("#resume *").each(function(){
    if(this.children.length == 0){
      $(this).attr("contenteditable","true");
    }else if($(this).children(".handle").length >0){
      $(this).attr("contenteditable","true");
      $(this).children(".handle").attr("contenteditable","false");
    }
  });
  $( ".responsibilities, .skill-list" ).sortable({
    //revert: true,
    handle: ".handle",
    items: "> li",
    // cursor: "move",
    // snap: true, // snapTolerance:10,
    containment:"parent",
  });
});

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

window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = $(".dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}

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