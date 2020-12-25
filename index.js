priorityTextUpdate = () => {
    let priorities = document.getElementsByClassName("priority")
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) {
            document.getElementById('priority').innerText = priorities[i].parentElement.getElementsByTagName("label")[0].innerText;
            if(i==0){
                document.getElementById('priority').style.background = "#ffcccc";
                document.getElementById('priority').style.color = "red";
            }
            else if(i==1){
                document.getElementById('priority').style.background = "#ccccff";
                document.getElementById('priority').style.color = "blue";
            }
            else if(i==2){
                document.getElementById('priority').style.background = "#e6e6e6";
                document.getElementById('priority').style.color = "black";
            }
        }
    }
}

addNote = () => {
    let title = document.getElementById('noteTitle').value.toUpperCase();
    let description = document.getElementById('noteDescp').value;
    if (description.length == 0) { description = '-' };
    let priority = document.getElementById('priority').innerText;
    const status = "pending";

    if (title.length == 0) {
        document.getElementById('emptyField').style.display = 'block';
    }
    else {
        let data;
        let success = document.getElementById('success')
        if (localStorage.getItem('notes') == null) {
            data = [];
            data.push({ "title": title, "description": description, "priority": priority, "status": status});
            data = JSON.stringify(data);
            localStorage.setItem('notes', data);
            success.innerText = `Note added successfully: ${title}..!!`;
            success.style.display = 'block';
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteDescp').value = '';
            document.getElementsByClassName("priority")[1].checked = true;
            priorityTextUpdate();
        }
        else {
            let already = false;
            data = JSON.parse(localStorage.getItem('notes'));
            data.forEach(item => {
                if (item["title"] == title) {
                    already = true;
                }
            })
            if (already != true) {
                data.push({ "title": title, "description": description, "priority": priority, "status": status});
                data = JSON.stringify(data);
                localStorage.setItem('notes', data);
                success.innerText = `Note added successfully: ${title}..!!`;
                success.style.display = 'block';
                document.getElementById('noteTitle').value = '';
                document.getElementById('noteDescp').value = '';
                document.getElementsByClassName("priority")[1].checked = true;
                priorityTextUpdate();
            }
            else {
                document.getElementById('alreadyField').style.display = 'block';
            }

        }
    }

    showNotes();
}

showNotes = () => {
    let notes = localStorage.getItem('notes');
    let html = "";
    if (notes != null) {
        if (notes.length != 2) {
            data = JSON.parse(notes);
            data.forEach(item => {
                if (item["priority"].toLowerCase() == 'maximum' && item["status"].toLowerCase()== 'pending') {
                    html += `
                    <div class="card my-2 mx-auto border-danger text-danger" style="width: 18rem;background:#ffcccc;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn btn-outline-success my-2" onClick="toDone(${data.indexOf(item)})">Set as done</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            })

            data.forEach(item => {
                if (item["priority"].toLowerCase() == 'normal' && item["status"].toLowerCase()== 'pending') {
                    html += `
                    <div class="card my-2 mx-auto border-primary text-primary" style="width: 18rem;background:#ccccff;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn btn-outline-success my-2" onClick="toDone(${data.indexOf(item)})">Set as done</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            })

            data.forEach(item => {
                if (item["priority"].toLowerCase() == 'minimum' && item["status"].toLowerCase()== 'pending') {
                    html += `
                    <div class="card my-2 mx-auto border-dark text-dark" style="width: 18rem;background:#e6e6e6;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn  btn-outline-success my-2" onClick="toDone(${data.indexOf(item)})">Set as done</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            });

            data.forEach(item => {
                if (item["status"].toLowerCase() == "done"){
                    html += `
                    <div class="card my-2 mx-auto border-success text-success" style="width: 18rem;background:#ccffcc;">
                        <div class="card-body text-center" style="position: relative;">
                            <h5 class="card-title">${item["title"]}</h5>
                            <hr>
                            <p class="card-text">${item["description"]}</p>
                            <div class="btn-group" role="group" style="position: absolute;top: 10px;right: 0px;">
                                <div class="dropdown">
                                    <button type="button" class="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="visually-hidden">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                        <button type="button" class="deleteNote btn btn-outline-primary my-2" onClick="deleteNotes(${data.indexOf(item)})">Delete</button>
                                        <button type="button" class="editNote btn  btn-outline-primary my-2" onClick="editButton(${data.indexOf(item)})">Edit</button>
                                        <button type="button" class="btn  btn-outline-danger my-2" onClick="toPending(${data.indexOf(item)})">Set as pending</button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    `
                }
            });

        }
        else {
            html = '<h5 class="card-title text-center">No saved notes yet..!!</h5>'
        }
        document.getElementById('savedNotes').innerHTML = html;
    }
    else {
        html = '<h5 class="card-title text-center">No saved notes yet..!!</h5>'
    }
    document.getElementById('savedNotes').innerHTML = html;
}

deleteNotes = (id) => {
    let data = JSON.parse(localStorage.getItem('notes'));
    data.splice(id, 1);
    data = JSON.stringify(data);
    localStorage.setItem('notes', data);
    location = window.location;
}

editNote = (id) => {
    let title = document.getElementById('noteTitle').value.toUpperCase();
    let description = document.getElementById('noteDescp').value;
    if (description.length == 0) { description = '-' };
    let priority = document.getElementById('priority').innerText;
    const status = "pending";

    if (title.length == 0) {
        document.getElementById('emptyField').style.display = 'block';
    }
    else {
        let data;
        let success = document.getElementById('success')
        if (localStorage.getItem('notes') == null) {
            success.classList.remove('alert-sucess');
            success.classList.add('alert-danger');
            success.style.display = 'block';
            success.innerText = "An unknown error occurred..!! Refreshing page..."
            location = window.location;
        }
        else {
            let already = false;
            data = JSON.parse(localStorage.getItem('notes'));
            data.forEach(item => {
                if (item["title"] == title) {
                    if (data.indexOf(item) != id) {
                        already = true;
                    }
                }
            })
            if (already != true) {
                data[id] = {"title": title, "description": description, "priority": priority, "status": status};
                data = JSON.stringify(data);
                localStorage.setItem('notes', data);
                location = window.location;
                success.innerText = `Note updated successfully: ${title}..!!`;
                success.style.display = 'block';
            }
            else {
                document.getElementById('alreadyField').style.display = 'block';
            }

        }
    }
}

editButton = (id) => {
    document.querySelector('h1').innerText = "Editor..!!"
    document.getElementById('btn-container').innerHTML = `
        <button class="btn btn-primary my-4" style="margin: auto;width:45%;" id="addButton" onclick="editNote(${id})">Edit</button>
        <button class="btn btn-primary my-4" style="margin: auto;width:45%;" id="addButton" onclick="editCancel()">Cancel</button>
    `
    let data = JSON.parse(localStorage.getItem('notes'));
    document.getElementById('noteTitle').value = data[id]["title"];
    document.getElementById('noteDescp').value = data[id]["description"];

    let priority = data[id]["priority"].toLowerCase();
    if (priority == "maximum") { check = 0 } else if (priority == "normal") { check = 1 } else if (priority == "minimum") { check = 2 };
    document.getElementsByClassName("priority")[check].checked = true;
    priorityTextUpdate();
    document.documentElement.scrollTop = 0;
}

editCancel = () => {
    location = window.location;
}

toPending = (id) => {
    let data = JSON.parse(localStorage.getItem('notes'));
    data[id]["status"] = "pending";
    data = JSON.stringify(data);
    localStorage.setItem('notes', data);
    showNotes();
}

toDone = (id) => {
    let data = JSON.parse(localStorage.getItem('notes'));
    data[id]["status"] = "done";
    data = JSON.stringify(data);
    localStorage.setItem('notes', data);
    showNotes();
}

darkLight = () => {
    let theme = document.getElementById('dark-light').checked;
    if (theme == true){
        var bColor = "#222";
        var hLabel = "#fff";
        var input = "#222";
        var card = "#333";
        var dropdown = "#111";
        var bodw = "none";
        var stheme = "dark"
    }
    else{
        var bColor = "#fff"
        var hLabel = "#000";
        var input = "#fff";
        var card = "#fff";
        var dropdown = "#fff";
        var bodw = "1px";
        var stheme = "light";
    }
    document.querySelector("body").style.background = bColor;
    document.querySelectorAll("h1").forEach(element =>{
        element.style.color = hLabel;
    });
    document.querySelectorAll("label").forEach(element =>{
        element.style.color = hLabel;
    });
    document.getElementById("search").style.background = input;
    document.getElementById("noteTitle").style.background = input;
    document.getElementById("search").style.color = hLabel;
    document.getElementById("noteTitle").style.color = hLabel;

    document.querySelector("hr").style.background = hLabel;

    document.querySelector("textarea").style.background = input;
    document.querySelector("textarea").style.color = hLabel;
    document.querySelector(".card").style.background = card;
    document.querySelectorAll(".dropdown-menu").forEach(element =>{
        element.style.background = dropdown;
    });

    document.querySelectorAll("input").forEach(element =>{
        element.style.border = bodw;
    });
    document.querySelector("textarea").style.border = bodw;

    localStorage.setItem('theme', stheme);
}

searchNotes = () => {
    let query = document.getElementById('search').value.toLowerCase();
    let title = document.querySelectorAll('.card-title');
    let description = document.querySelectorAll('.card-text');
    
    let match = [];
    let nonmatch = [];

    title.forEach(element => {
        if (element.innerText.toLowerCase().indexOf(query) > -1) {match.push(element)} else {nonmatch.push(element)};
    });
    description.forEach(element => {
        if (element.innerText.toLowerCase().indexOf(query) > -1) {match.push(element)} else {nonmatch.push(element)};
    });

    nonmatch.forEach(element =>{
        element.parentElement.parentElement.style.display = "none" 
    });

    match.forEach(element =>{
        element.parentElement.parentElement.style.display = "block" 
    });
}

initialRun = () => {
    let theme = localStorage.getItem('theme');
    if (theme==null){theme = "light";localStorage.setItem('theme','light')};
    if (theme=="dark"){document.getElementById("dark-light").checked = true};
    darkLight();

    document.getElementsByClassName("priority")[1].checked = true;
    priorityTextUpdate();

    document.querySelectorAll(".priority").forEach(item => {
        item.addEventListener('input', priorityTextUpdate);
    })

    document.getElementById("dark-light").addEventListener("input", darkLight);
    
    showNotes();

    document.getElementById('search').addEventListener('input', searchNotes);

    document.getElementById('noteTitle').addEventListener('input', () => {
        document.getElementById('emptyField').style.display = 'none';
        document.getElementById('alreadyField').style.display = 'none';
        document.getElementById('success').style.display = 'none';
    })
}

initialRun();
