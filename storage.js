function writeStrage(id, name, isDone) {
	const todoData = {};
	todoData['name'] = name;
	todoData['isDone'] = isDone;
	localStorage['todo-' + id] = JSON.stringify(todoData);
}

function editTodoName(id, name) {
    let todoData = readStrage(id);
    if(!todoData) {
        todoData = {};
        todoData['isDone'] = false;
    }
	todoData['name'] = name;
	localStorage['todo-' + id] = JSON.stringify(todoData);
}

function readStrage(id) {
    const str = localStorage['todo-' + id];
    if(str === ''){
        return false;
    }
	return JSON.parse(str);
}

function removeStrage(id) {
	localStorage['todo-' + id] = '';
}