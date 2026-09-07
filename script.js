const todo_column= document.querySelector("#todo");
const progress_column = document.querySelector("#progress");
const done_column = document.querySelector("#done");

const tasks =document.querySelectorAll('.task');

let dragElement =null;

// drag event removeEventListener added when task is drag and move to another column 

tasks.forEach(task=>{
    task.addEventListener("drag",(e)=>{
        dragElement = task;
   

    })
})

function addDragEventListerners(column){
column.addEventListener("dragenter",function(e){
  e.preventDefault();
  column.classList.add("hover-over");
});

column.addEventListener("dragover",function(e){
    e.preventDefault();
});


column.addEventListener("dragleave",function(e){
    e.preventDefault();
    column.classList.remove("hover-over");
});


column.addEventListener("drop",function(e){
    e.preventDefault();
    console.log("dragged", dragElement,column);
    column.appendChild(dragElement);
    column.classList.remove("hover-over");
});



}

addDragEventListerners(todo_column);
addDragEventListerners(progress_column);
addDragEventListerners(done_column);