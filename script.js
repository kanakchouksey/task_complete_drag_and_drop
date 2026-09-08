const todo_column = document.querySelector("#todo");
const progress_column = document.querySelector("#progress");
const done_column = document.querySelector("#done");

const tasks = document.querySelectorAll('.task');
const toggle_modal = document.getElementById('toggle_modal');
const modal = document.querySelector('.modal');
const modalbg = document.querySelector('.bg');
const addTaskbtn = document.getElementById('add-new-task')

let tasksData ={};

let dragElement = null;

if(localStorage.getItem("tasks")){
    let data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for(const col in data){
        console.log(col,data[col]);
    }
};

toggle_modal.addEventListener("click", function () {
    modal.classList.toggle('active');

});

modalbg.addEventListener("click", function () {
    modal.classList.toggle('active');
});

addTaskbtn.addEventListener("click", () => {
    const tasktitle = document.querySelector("#task-title-input").value;
    const taskdesc = document.querySelector("#task-desc-input").value;
    const div = document.createElement("div");
    div.classList.add('task');
    div.setAttribute("draggable", "true");
    div.innerHTML = `   <h2>${tasktitle}</h2>
                   <p>${taskdesc}</p>
                       <button class="delete">Delete</button>`
    todo_column.appendChild(div);
    modal.classList.remove('active');

    div.addEventListener("drag", (e) => {
        dragElement = div;
    });
    const count = todo_column.querySelector(".right");

count.innerText = Number(count.innerText) + 1;






});

// drag event removeEventListener added when task is drag and move to another column 

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;



    })
})

function addDragEventListerners(column) {
    column.addEventListener("dragenter", function (e) {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragover", function (e) {
        e.preventDefault();
    });


    column.addEventListener("dragleave", function (e) {
        e.preventDefault();
        column.classList.remove("hover-over");
    });


    column.addEventListener("drop", function (e) {
        e.preventDefault();
        console.log("dragged", dragElement, column);
        column.appendChild(dragElement);
        column.classList.remove("hover-over");


        [todo_column, progress_column, done_column].forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");
           

            tasksData[col.id]=Array.from(tasks).map(t =>{
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector("p").innerText

                }
            
            });

         localStorage.setItem("tasks",JSON.stringify(tasksData));
            
             count.innerText = tasks.length;


        });
    });



}

addDragEventListerners(todo_column);
addDragEventListerners(progress_column);
addDragEventListerners(done_column);


