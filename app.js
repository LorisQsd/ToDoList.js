// Thibz

// Loris
// ADD TASK
const addBtn = document.querySelector("#push");
const inputTask = document.querySelector("#input-task");
const errorMsg = document.querySelector("#error-msg");
let toggleModifyBtn = false;

addBtn.addEventListener("click", handleTask)

function handleTask(e){
    e.preventDefault();

    if(!inputTask.value) {
        errorMsg.textContent = "Veuillez renseigner le champs avant d'ajouter une tâche";
        errorMsg.style.opacity = "1";
        return;
    } else {
        errorMsg.textContent = ".";
        errorMsg.style.opacity = "0";
        const taskDiv = document.querySelector(".input-task")
    
        taskDiv.insertAdjacentHTML("afterend", `
        <div class="task">
            <div>
                <p><span>${currentDate()}</span>&nbsp;:&nbsp;
                    <span id="task-content">${inputTask.value}</span>
                </p> 
    
            </div>
            <div class="group-btn">
                <button class="check-btn"><img src="ressources/white-check.svg" alt="Check"></button>
                <button class="modify-btn">Modifier</button>
            </div>
        </div>
        `);
        inputTask.value = "";
        inputTask.focus();
        // CHECK TASK
        const checkBtn = document.querySelectorAll(".check-btn");
        
        checkBtn.forEach(btn => {
            btn.addEventListener("click", checkTask)
        })
        
        function checkTask(e){
            e.preventDefault();
            const task = e.target.parentElement.parentElement;
            task.remove()
        }
        
        // MODIFY TASK
        const modifyBtn = document.querySelectorAll(".modify-btn");
        
        
        modifyBtn.forEach(btn => {
                btn.addEventListener("click", modifyTask);
        })
        
        function modifyTask(e){
            if (toggleModifyBtn){
                return;
            } else {
                toggleModifyBtn = true;
                e.preventDefault();
                const taskContent = e.target.parentElement.parentElement.querySelector("#task-content");
                taskContent.style.display = "none";
                
                taskContent.insertAdjacentHTML("afterend", `
                <div class="modify-content">
                    <input type="text" value="${taskContent.innerHTML}" id="modify-input">
                    <button class="check-btn"><img src="ressources/white-check.svg" alt="Check"></button>
                </div>
                `)
            
                const checkBtnModify = document.querySelector(".check-btn")
                const modifyInput = document.querySelector("#modify-input")
                const modifyContent = document.querySelector(".modify-content")
            
                checkBtnModify.addEventListener("click", () => {
                    taskContent.textContent = modifyInput.value;
                    taskContent.style.display = "block";
            
                    const taskParagraph = e.target.parentElement.parentElement.querySelector(".task div:first-child p")
                    taskParagraph.removeChild(modifyContent)
                    toggleModifyBtn = false;
                })
            }
            
        }
    }

}


// FUNCTION TO GET DATE TIME
function currentDate(){
    const dateTime = new Date().toLocaleString();
    return dateTime;
}