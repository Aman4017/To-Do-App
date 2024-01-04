// ##################################
// ##                              ##
// ##       Variable Section       ##
// ##                              ##
// ##################################





var pageHeader = document.querySelector("#header"),
    headerTime = document.querySelector("#time"),
    headerDate = document.querySelector("#date"),
    greetings = document.querySelector("#greetings"),
    accountProfile = document.querySelector("#account_profile"),
    accountPicture = document.querySelector("#account_picture"),
    pageBody = document.querySelector("body"),
    pageHtml = document.querySelector("html"),
    username = document.querySelector("#username"),
    editUserBtn = document.querySelector("#edit_user_btn"),
    wallpaper = [
        "https://wallpaperaccess.com/full/234987.jpg",
        "https://wallpaperaccess.com/full/1222466.jpg",
        "https://wallpaperaccess.com/full/1103075.jpg",
        "https://wallpaperaccess.com/full/1569343.jpg",
        "https://wallpaperaccess.com/full/4263881.jpg",
        "https://wallpaperaccess.com/full/5774.jpg"
    ],
    lsUsername = localStorage.getItem("username"),
    lsProfile = localStorage.getItem("profile"),
    addListBtn = document.querySelector("#add_list_btn"),
    addListBtn2 = document.querySelector("#add_list_btn2"),
    todoTaskSection = document.querySelector("#todo_container"),
    listContainer = document.querySelector("#list_dsp_container"),
    listName = document.getElementsByClassName("list_name"),
    listsContainer = document.getElementsByClassName("list_container"),
    index = 0,
    listFooterContainer = document.querySelector("#list_footer_container");



function backgroundImg(element, index = 0){

    element.style.backgroundImage = `url('${wallpaper[index]}')`
}

function clock() {
    var time = new Date(),
        hours = time.getHours(),
        minutes = String(time.getMinutes()).padStart(2, "0"),
        day = time.getDay(),
        month = time.getMonth(),
        date = time.getDate(),
        hours12Format = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        ];
    if (JSON.parse(localStorage.getItem("24hour")) === true) {
        headerTime.innerText = hours + ":" + minutes;
    } else {
        headerTime.innerText = hours12Format[hours] + ":" + minutes;
    }
    headerDate.innerText = dayArray[day] + ", " + monthArray[month] + " " + date;
    if (hours >= 6 && hours <= 11) {
        greetings.innerText = "Good morning,";
    } else if (hours >= 12 && hours <= 17) {
        greetings.innerText = "Good afternoon,";
    } else {
        greetings.innerText = "Good evening,";
    }
}

backgroundImg(pageHeader);
clock();
setInterval(clock, 1000);


function defaultProfilePicture(elmnt, n, more) {
  elmnt.innerHTML = `
    <svg height="${n}" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M163.786 104.571C163.786 124.434 147.44 140.643 127.143 140.643C106.846 140.643 90.5 124.434 90.5 104.571C90.5 84.7089 106.846 68.5 127.143 68.5C147.44 68.5 163.786 84.7089 163.786 104.571Z" stroke="currentColor" stroke-width="9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M175.137 192.15C174.831 166.14 153.651 145.15 127.569 145.15C101.486 145.15 80.3067 166.14 80.0005 192.15H71C71.3066 161.17 96.5158 136.15 127.569 136.15C158.621 136.15 183.831 161.17 184.137 192.15H175.137Z" fill="currentColor"/>
    </svg>${more}`;
}

function updateUser() {
  if (lsProfile != null) {
    accountProfile.innerHTML = `<img id="account_picture" src="data:image/png;base64,${lsProfile}" alt="User Profile">`;
  } else {
    defaultProfilePicture(accountProfile, 42, "");
  }
  if (lsUsername != null) {
    username.innerText = lsUsername;
  } else {
    username.innerText = "Account Name";
  }
}

updateUser();

function checkThemeMode() {
  if (localStorage.getItem("darkmode") != null) {
    pageHtml[0].setAttribute("darkmode", localStorage.getItem("darkmode"));
  }
  document.documentElement.style.setProperty("--accentColor", localStorage.getItem("accentColor"));
  document.documentElement.style.setProperty("--accentText", localStorage.getItem("accentText"));
}

checkThemeMode();

function closeMenu(elmnt) {
  var modalContainer = document.querySelectorAll("#popup_container"),
    modalBG = document.querySelectorAll(".all_popup");
  function closeAnimation() {
    setTimeout(() => {
      document.getElementById(elmnt).remove();
      document.removeEventListener("click", removeMenu);
    }, 200);
    modalContainer[0].removeAttribute("id");
  }
  function removeMenu(event) {
    var clickMenu = modalContainer[0].contains(event.target);
    var clickBG = modalBG[0].contains(event.target);
    if (!clickMenu && clickBG) {
      closeAnimation();
    }
  }
  document.addEventListener("click", removeMenu);
  document.querySelector(".close_btn").onclick = closeAnimation;
  setTimeout(() => {
    modalContainer[0].setAttribute("class", "popup_container");
  }, 0);
}

function focusInput(elmnt) {
  elmnt.focus();
  elmnt.setSelectionRange(elmnt.value.length, elmnt.value.length);
}


function updateTAB() {
  const storage = localStorage.getItem("list_selected"),
    title = document.querySelector("title");

  if (storage) {
    title.innerText = `To Do - ${storage.substring(5)}`;
  }
}








// ##################################
// ##                              ##
// ##      Edit Account            ##
// ##                              ##
// ##################################






editUserBtn.onclick = () => {
    var editUserSection = document.createElement("div"),
    fileInputDOM = `<div id="change_picture_btn"><label for="profile">Change</label></div>`,
    profileImgDOM = `<img id="edit_user_account_picture" alt="User Profile" src="data:image/png;base64,${lsProfile}">${fileInputDOM}`;

    pageBody.appendChild(editUserSection);
    editUserSection.setAttribute("id", "user_popup_section");
    editUserSection.setAttribute("class", "all_popup");
    editUserSection.innerHTML = `
        <form id="popup_container" autocomplete="off">
            <header class="popup_header">
                <b>Edit Profile</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_divider"></div>
            <main class="form_body">
                <div id="edit_user_account_profile"></div>
                <input type="file" class="hidden" id="profile" accept=".png, .jpg, .jpeg"/>
                <input type="text" class="input_text" id="change_username" placeholder="Enter a name" maxlength="30">
            </main>
            <div class="line_divider"></div>
            <footer class="form_footer">
                <p class="form_error hidden"></p>
                <button id="save_btn">Save</button>
            </footer>
        </form>
    `;

    var userProfile = document.querySelector("#edit_user_account_profile"),
        input = document.querySelector("#change_username"),
        saveBtn = document.querySelector("#save_btn"),
        errorMsg = document.querySelector(".form_error"),
        profile = document.querySelector("#profile"),
        fileReader = new FileReader();

    closeMenu("user_popup_section");
    
    if(lsProfile != null) {
        userProfile.innerHTML = profileImgDOM;
    } else {
        defaultProfilePicture(userProfile, 98, fileInputDOM);
    }

    if(lsUsername != null) {
        input.value = lsUsername;
    }

    profile.onchange = () => {
        userProfile.innerHTML = profileImgDOM;
        fileReader.onload = function() {
            document.querySelector("#edit_user_account_picture").src = fileReader.result;
        };
        if(profile.files[0]) {
            fileReader.readAsDataURL(profile.files[0]);
        };
    }

    saveBtn.onclick = (e) => {
        const inputValue = input.value.trim().toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        function errorInput(msg) {
            e.preventDefault();
            errorMsg.classList.remove("hidden");
            errorMsg.innerText = msg;
        }
        if (inputValue.match(/^[a-zA-ZÑñ]+(?: [a-zA-ZÑñ-]+)*$/) && inputValue.length < 33) {
            e.preventDefault();
            localStorage.setItem("username", inputValue);
            if (fileReader.readyState == 2) {
                const base64String = fileReader.result
                    .replace('data:', '')
                    .replace(/^.+,/, '');
                localStorage.setItem("profile", base64String);
                lsProfile = localStorage.getItem("profile");
            }
            lsUsername = localStorage.getItem("username");
            updateUser();
            document.querySelector(".close_btn").click();
        } else if (inputValue == "") {
            errorInput("Your input name is empty");
        } else {
            errorInput("Number is not allowed");
        }
    };
}









// ##################################
// ##                              ##
// ##      Create a List           ##
// ##                              ##
// ##################################






function createList() {
    var createListSection = document.createElement("div");
    pageBody.appendChild(createListSection);
    createListSection.setAttribute("id", "list_popup_container"),
    createListSection.setAttribute("class", "all_popup");
    createListSection.innerHTML = `
        <form id="popup_container" autocomplete="off">
            <header class="popup_header">
                <p>Add a List</p>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_divider"></div>
            <main class="form_body">
                <div class="input_section">
                    <input type="text" id="name_list" class="input_text" placeholder="Enter a name">
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error hidden">There is an error creating your list.</p>
            </main>
        </form>
    `;

    var inputField = document.querySelector("#name_list"),
        saveBtn = document.querySelector("#save_btn");

    closeMenu("list_popup_container");
    inputField.focus();

    function saveit(e) {
        e.preventDefault();

        if (localStorage.getItem("list_last_id") == null) {
            localStorage.setItem("list_last_id", 0);
        }

        localStorage.setItem("list_last_id", parseInt(localStorage.getItem("list_last_id")) + 1);

        const tempID = localStorage.getItem("list_last_id").toString().padStart(4, "0"),
            todos = "#" + tempID + inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase());

        if(localStorage.getItem(todos) == null)
        {
            localStorage.setItem(todos, "[]");
            localStorage.setItem("list_selected", todos);
            displayList();
            eventListener();
            document.querySelector(".close_btn").click();
        }
        else
        {
            document.querySelector(".form_error").classList.remove("hidden");
        }
    }

    inputField.oninput = () => {
        if (inputField.value == "" || inputField.value.match(/^\s*$/) || inputField.value.length > 32) {
            saveBtn.setAttribute("disabled", "");
        } else {
            saveBtn.removeAttribute("disabled");
        }
    };

    saveBtn.onclick = saveit;
}








// ##################################
// ##                              ##
// ##      Create a Task           ##
// ##                              ##
// ##################################







function createTask() {
    var createTaskSection = document.createElement("div");
    pageBody.appendChild(createTaskSection);
    createTaskSection.setAttribute("id", "list_popup_container");
    createTaskSection.setAttribute("class", "all_popup");
    createTaskSection.innerHTML = `
        <form id="popup_container" autocomplete="off">
            <header class="popup_header">
                <p>Add a Task</p>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_divider"></div>
            <main class="form_body">
                <div class="input_section">
                    <input type="text" id="name_list" class="input_text" placeholder="Enter a name">
                    <button id="save_btn" disabled>Save</button>
                </div>
                    <p class="form_error hidden">There is an error creating your todo.</p>
            </main>
        </form>
    `;

    var inputField = document.querySelector("#name_list"),
        saveBtn = document.querySelector("#save_btn");

    closeMenu("list_popup_container");
    inputField.focus();

    function saveit(e) {
        e.preventDefault();

        localStorage.setItem(
            localStorage.getItem("list_selected"),
            JSON.stringify([...JSON.parse(localStorage.getItem(localStorage.getItem("list_selected")) || "[]"),
            { name: inputField.value.trim().replace(/^\S/, (c) => c.toUpperCase()), completed: false }])
        );

        if (document.querySelector("#todo_dsp_container") != null) {
            document.querySelector("#todo_dsp_container").remove();
        }

        loadTasks();
        
        document.querySelector("#add_task_btn").onclick = createTask;

        document.querySelector(".close_btn").click();
    }

    inputField.oninput = () => {
        if (inputField.value == "" || inputField.value.match(/^\s*$/)) {
            saveBtn.setAttribute("disabled", "");
        } else {
            saveBtn.removeAttribute("disabled");
        }
    };

    saveBtn.onclick = saveit;
}








// ##################################
// ##                              ## 
// ##    Load Local Storage        ##  
// ##                              ##   
// ##################################   








function updateActiveTodo() {
  const activeTodo = document.querySelector(".list_container.list_active"),
    listSelected = localStorage.getItem("list_selected"),
    listID = localStorage.getItem("list_last_id"),
    currentSelected = document.getElementById(listSelected.substring(0, 5)),
    activeElmnts = `<div class="list_color"></div><p class="list_name">${listSelected.substring(5)}</p>`;

  if (listID == 1) {
    currentSelected.innerHTML = activeElmnts;
  } else {
    activeTodo.classList.remove("list_active");
    document.querySelector(".list_color").remove();
    currentSelected.classList.add("list_active");
    currentSelected.innerHTML = activeElmnts;
  }

  todoHeader();

  loadTasks();

  document.querySelector("#add_task_btn").onclick = createTask;
}


if(localStorage.getItem("list_selected")) {
    var emptyHint = document.querySelector(".empty_container");
    emptyHint.style.display = "none";
}



function todoHeader() {
    todoTaskSection.innerHTML = `
    <section class="todo_header_container">
        <h1 class="todo_header_title">${localStorage.getItem("list_selected").substring(5)}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" onclick="menuTodo('block', 'flex')">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
        </svg>
        <div class="modal_bg_transparent" onclick="menuTodo('none', 'none')"></div>
        <ul id="edit_popup_container">
            <li onclick="deleteConfirm('Delete List?', deleteListMsg, deleteTodo)">Delete</li>
        </ul>
    </section>
    <div class="line_divider"></div>
    <button type="button" id="add_task_btn"><span>&#43;</span>Add a task</button>
    `;
}

function deleteTodo() {
  localStorage.removeItem(localStorage.getItem("list_selected"));
  if (Object.keys(localStorage).some((key) => key.startsWith("#"))) {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith("#"));
    keys.sort();
    localStorage.setItem("list_selected", keys[keys.length - 1]);
    displayList();
    eventListener();
  } else {
    localStorage.removeItem("list_last_id");
    localStorage.removeItem("list_selected");
    listContainer.innerHTML = `<div class="empty_container">List display here</div>`;
    todoTaskSection.innerHTML = `<p class="empty_container">
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="3"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <g id="list-square" transform="translate(-2 -2)"> <rect id="secondary" fill="#2ca9bc" width="18" height="18" rx="1" transform="translate(3 3)"></rect> 
                            <line id="primary-upstroke" x2="0.1" transform="translate(7.45 8)" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line> 
                            <line id="primary-upstroke-2" data-name="primary-upstroke" x2="0.1" transform="translate(7.45 12)" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line> 
                            <line id="primary-upstroke-3" data-name="primary-upstroke" x2="0.1" transform="translate(7.45 16)" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line> 
                            <path id="primary" d="M12,8h5m-5,4h5m-5,4h5M3,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H4A1,1,0,0,0,3,4Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> 
                        </g>
                    </g>
                </svg> Start listing your to do and be productive.
    <button type="button" id="add_list_btn2">Create new list</button>
</p>`;
    document.querySelector("#add_list_btn2").onclick = createList;
    document.querySelector("title").innerText = "To Do List";
  }
  document.querySelector(".close_btn").click();
}

function loadTasks() {
  if (localStorage.getItem(localStorage.getItem("list_selected")) !== "[]") {
    todoTaskSection.innerHTML += `<ul id="todo_dsp_container"></ul>`;

    var todos = Array.from(JSON.parse(localStorage.getItem(localStorage.getItem("list_selected")))),
      taskID = 0,
      todoContainer = document.querySelector("#todo_dsp_container");

    todos.forEach((todo) => {
      todoContainer.innerHTML += `
                <li class="task_list">
                    <input type="checkbox" class="task_checkbox" id="task_checkbox_${taskID}" onclick="checkTask(${taskID})" ${
        todo.completed == true ? "checked" : ""
      }/>
                    <input type="text" class="task_input" id="task_input_${taskID}" value="${
        todo.name
      }" oninput="editTask(${taskID})" />
                    <i class="task_delete" id="task_delete_${taskID}" onclick="deleteConfirm('Delete Task?', deleteTaskMsg, function() {deleteTask(${taskID})})">&#10006</i>
                </li>`;
      taskID++;
    });
  }
}


function checkTask(n) {
  const selected = localStorage.getItem("list_selected"),
    todos = Array.from(JSON.parse(localStorage.getItem(selected)));
  if (document.querySelector("#task_checkbox_" + n).checked) {
    todos[n].completed = true;
    localStorage.setItem(selected, JSON.stringify(todos));
  } else {
    todos[n].completed = false;
    localStorage.setItem(selected, JSON.stringify(todos));
  }
}






function displayList(){


    if (Object.keys(localStorage).some((key) => key.startsWith("#"))) {
        
        listContainer.innerHTML = "";
        

    
        const keys = Object.keys(localStorage);
        keys.sort();

        for (let i=0; i<keys.length; i++) {
            var key = keys[i];
           
            if(key[0] === "#") {
                const value = localStorage.getItem(key);
            
                if(localStorage.getItem(localStorage.getItem("list_selected"))==null){
                    localStorage.setItem("list_selected", key);
                }

                if (localStorage.getItem("list_selected")==key) {
                    listContainer.innerHTML += `
                        <div class="list_container list_active" id="${key.substring(0, 5)}">
                            <div class="list_color"></div>
                            <p class="list_name">${key.substring(5)}</p>
                        </div>
                    `
                }
                else {
                    listContainer.innerHTML += `
                        <div class="list_container" id="${key.substring(0, 5)}">
                            <p class="list_name">${key.substring(5)}</p>
                        </div>
                    `
                }
            }
        }


        todoHeader();
        loadTasks();

        document.querySelector("#add_task_btn").onclick = createTask;
    }

}


function eventListener() {
    for(let i=0; i<listsContainer.length; i++)
    {
        const list = listsContainer[i];
        list.onclick = () => {
            localStorage.setItem("list_selected", listsContainer[i].getAttribute("id") + listName[i].innerText);
            updateActiveTodo();
            updateTAB();
            
        }
        
    }
    
}


displayList();
eventListener();



function deleteTask(n) {
  const selected = localStorage.getItem("list_selected"),
    todos = Array.from(JSON.parse(localStorage.getItem(selected)));
  todos.splice(n, 1);
  localStorage.setItem(selected, JSON.stringify(todos));

  displayList();
  eventListener();

  document.querySelector(".close_btn").click();
}

const deleteListMsg = `You'll lose all the task inside this list. This cannot be recover once deleted.<br><br>Are you sure you want to permanently delete this list?`,
  deleteTaskMsg = `Are you sure you want to delete this task?`;


function menuTodo(a, b) {
  document.querySelector(".modal_bg_transparent").style.display = a;
  document.querySelector("#edit_popup_container").style.display = b;
}


function deleteConfirm(title, msg, func) {
  menuTodo("none", "none");
  const deleteConfirmSection = document.createElement("div");
  pageBody.appendChild(deleteConfirmSection);
  deleteConfirmSection.setAttribute("id", "delete_confirm_section");
  deleteConfirmSection.setAttribute("class", "all_popup");
  deleteConfirmSection.innerHTML = `
        <form id="popup_container">
            <header class="popup_header">
                <b>${title}</b>
                <i class="close_btn">&#xe8bb;</i>
            </header>
            <div class="line_dividerX"></div>
            <main class="form_body add_list_body">
                <p>${msg}</p>
            </main>
            <div class="line_divider"></div>
            <footer class="form_footer flex-row">
                <button type="button" id="cancel-btn" class="secondary-btns">Cancel</button>
                <button type="button" id="delete-btn" class="error-btns">Delete</button>
            </footer>
        </form>`;

  closeMenu("delete_confirm_section");

  document.querySelector("#cancel-btn").onclick = () => {
    document.querySelector(".close_btn").click();
  };

  document.querySelector("#delete-btn").onclick = () => {
    func();
  };
}


function editTask(n) {
  const selected = localStorage.getItem("list_selected"),
    todos = Array.from(JSON.parse(localStorage.getItem(selected)));
  todos[n].name = document.querySelector("#task_input_" + n).value;
  localStorage.setItem(selected, JSON.stringify(todos));
}


function changeBackground() {
    if(index>=5)
    {
        index = 0;
    }
    else
    {
        index++;
    }

    backgroundImg(pageHeader, index);
}
