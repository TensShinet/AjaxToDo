// 1. 输入框， 和Add button
//     我先不考虑数据的更新
// 2. 载入数据（ajax）
// 3. 显示数据（插进页面中）
// 4. 给数据加上删除按钮
// 5. 完成按钮
// 6. 更新按钮
// 7. 修改页面
// 8. 添加css

var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            reseponseCallback(r)
        }
    }
    // 发送请求
    r.send(data)
}

// 1. 输入框， 和Add button
var init = function() {
    var s = `
        <input type="text" id="id-input-todo">
        <button type="button" id="id-button-addButton">Add</button>
    `
    var container = e('#id-div-container')

    appendHtml(container, s)
}

var baseUrl = 'file:///C:/Users/TenSh/Desktop/AJAX/'
// 2. 载入数据
// 现在， 用ajax 载入数据
var loadTodos = function() {
    var method = 'GET'
    var path = baseUrl + 'todos.xml'
    ajax(method, path, null, function(r){
        var todos = JSON.parse(r.response)
        log(todos)
        insertTodos(todos)
    })
}
// 将todo的内容转入, HTML 格式
var todoTemplate = function(todo) {
    var task = todo.task
    var todoId = todo.id
    log("todoTmplat() every task:", task)
    var t = `
        <div id="${todoId}">
            <button type="button" class="todo-finished">Finished</button>
            <button type="button" class="todo-delete">Delete</button>
            <span contenteditable="true">
            ${task}
            <span>
        </div>


    `
    return t
}
// 3. 显示todos
var insertTodos = function(todos) {
    // 只显示todos
    var container = e('#id-div-container')
    var todo, t
    for (var i = 0; i < todos.length; i++) {
        todo = todos[i]
        log("insertTodos() every todo:", todo)
        t = todoTemplate(todo)
        appendHtml(container, t)
    }
}

// 添加删除， 完成， 更新按钮

// 给每个按钮绑定事件
// Add button
// 现在还不会， 向本地文件， 写入数据，

// 复习套路算了， 写不了， 至少学了一个用Ajax载入数据的方法
// 搞清楚了回调函数， 的意思。
// 事件委托&&toggleClass
// 按到Finishd, 变换class
// 按到Delete, 删除自己

var bindEvents = function() {
    // 先Finished
    // 这里要用到事件委托
    var c = e('#id-div-container')
    c.addEventListener('click', function(event){
        var target = event.target
        var f = target.parentElement
        // 通过这个条件知道是 Finished button
        if(target.classList.contains('todo-finished')) {
            // 改变样式, 改变父节点的样式
            toggleClass(f, 'done')
        } else if (target.classList.contains('todo-delete')) {
            f.remove()
        }
    })
}

var toggleClass = function(element, className) {
    var e = element
    if(e.classList.contains(className)) {
        e.classList.remove(className)
    } else {
        e.classList.add(className)
    }
}


var __main = function() {
    init()
    loadTodos()
    bindEvents()
}
__main()
