const delete_button_svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';

const done_button_svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

document.getElementById('add').addEventListener('click', function(){
    const todo_name = document.getElementById('item').value;
    if(todo_name !== null && todo_name.length > 0){
        insert_todo_li();
    }
});

document.addEventListener('keydown', function(e){
    const todo_name = document.getElementById('item').value;
    if(e.which === 13 && todo_name !== null && todo_name.length > 0){
        insert_todo_li();
    }
});

let total = {
    todo_list: [],
    completed_list: []
};

display_cache();

function display_cache(){
    const todo = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    const com = localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : [];
    console.log(todo);
    console.log(com);
    for(let i = 0; i < todo.length; i++){
        display_cache_todo_completed(todo[i], false);
    }
    for(let i = 0; i < com.length; i++){
        display_cache_todo_completed(com[i], true);
    }
}

function display_cache_todo_completed(value, com){
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerText = value;

    let done_button = document.createElement('button');
    done_button.innerHTML = done_button_svg;
    done_button.classList.add('complete');

    done_button.addEventListener('click', task_completed);

    let delete_button = document.createElement('button');
    delete_button.innerHTML = delete_button_svg;
    delete_button.classList.add('remove');

    delete_button.addEventListener('click', remove_todo_li)

    let button_div = document.createElement('div');
    button_div.classList.add('buttons');
    button_div.appendChild(delete_button);
    button_div.appendChild(done_button);

    li.appendChild(p);
    li.appendChild(button_div);

    let ul;
    if(com) 
        ul = document.getElementById('completed');
    else 
        ul = document.getElementById('todo');
    ul.insertBefore(li, ul.childNodes[0]);
    if(com)
        total.completed_list.push(li);
    else
        total.todo_list.push(li);
}

function insert_todo_li(){
    let li = document.createElement('li');
    let p = document.createElement('p');
    p.innerText = document.getElementById('item').value;

    let done_button = document.createElement('button');
    done_button.innerHTML = done_button_svg;
    done_button.classList.add('complete');

    done_button.addEventListener('click', task_completed);

    let delete_button = document.createElement('button');
    delete_button.innerHTML = delete_button_svg;
    delete_button.classList.add('remove');

    delete_button.addEventListener('click', remove_todo_li)

    let button_div = document.createElement('div');
    button_div.classList.add('buttons');
    button_div.appendChild(delete_button);
    button_div.appendChild(done_button);

    li.appendChild(p);
    li.appendChild(button_div);

    const todo_ul = document.getElementById('todo');
    if(todo_ul.hasChildNodes){
        todo_ul.insertBefore(li, todo_ul.childNodes[0]);
    }
    else{
        todo_ul.appendChild(li);
    }
    total.todo_list.push(li);
    document.getElementById('item').value = null;
    update_cache();
    let date = new Date();
    add_date_cache(String(date.getFullYear())+String(date.getMonth())+String(date.getDate())+"todo");
}

function update_cache(){
    let todo_arr = [], com_arr = [];
    for(let i = 0; i < total.todo_list.length; i++){
        todo_arr[i] = (total.todo_list[i].childNodes[0].innerHTML);
    }
    for(let i = 0; i < total.completed_list.length; i++){
        com_arr[i] = (total.completed_list[i].childNodes[0].innerHTML);
    }
    console.log(todo_arr);
    console.log(com_arr);
    localStorage.setItem('todo', JSON.stringify(todo_arr));
    localStorage.setItem('completed', JSON.stringify(com_arr));
}

function remove_todo_li(){
    const li = this.parentNode.parentNode, ul = li.parentNode;
    ul.removeChild(li);
    if(total.todo_list.indexOf(li) === -1){
        const i = total.completed_list.indexOf(li);
        total.completed_list.splice(i, 1);
        let date = new Date();
        delete_date_cache(String(date.getFullYear())+String(date.getMonth())+String(date.getDate())+"completed");
    }
    else{
        const i = total.todo_list.indexOf(li);
        total.todo_list.splice(i, 1);
        let date = new Date();
        delete_date_cache(String(date.getFullYear())+String(date.getMonth())+String(date.getDate())+"todo");
    }
    update_cache();
}

function task_completed(){
    const li = this.parentNode.parentNode, ul = li.parentNode;
    ul.removeChild(li);
    const completed = document.getElementById('completed');
    if(completed.hasChildNodes){
        completed.insertBefore(li, completed.childNodes[0]);
    }
    else{
        completed.appendChild(li);
    }
    const i = total.todo_list.indexOf(li);
    total.todo_list.splice(i, 1);
    total.completed_list.push(li);
    update_cache();
    let date = new Date();
    add_date_cache(String(date.getFullYear())+String(date.getMonth())+String(date.getDate())+"completed");
}

function add_date_cache(key){
    let  value = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : 0;
    value = parseInt(value);
    value++;
    localStorage.setItem(key, JSON.stringify(value));
}

function delete_date_cache(key){
    let value = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : -1;
    if(value !== -1){
        parseInt(value);
        value--;
        localStorage.setItem(key, JSON.stringify(value));
    }
}
