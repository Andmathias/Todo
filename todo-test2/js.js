function Task(slots){
    this.name = slots.name;
    this.des = slots.des;
};
Task.instances = {};
Task.add = function(slots){
    var task = new Task(slots);
    Task.instances[slots.name] = task;
    console.log("Task"+ slots.name + "created!");
}
taskString = localStorage["tasks"];
tasks = JSON.parse(taskString);
Task.converts= function(bookRow){
    var task = new Task(bookRow);
    return task;
};

Task.showAll = function () {
    var key="", keys=[], i=0,
        taskString="", tasks={};
    try {
        if (localStorage["tasks"]) {
            taskString = localStorage["tasks"];
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (taskString) {
        tasks = JSON.parse( taskString);
        keys = Object.keys( tasks);
        console.log( keys.length +" tasks loaded.");
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            Task.instances[key] = Task.converts( tasks[key]);
        }
    }
};

Task.update = function (slots) {
    var task = Task.instances[slots.task];
    if (task.name !== slots.name) { task.name = slots.name;}
    if (task.des !== slots.des) { task.des = slots.des;}
    console.log("Task " + slots.name + " modified!");
};

Task.destroy = function (name) {
    if (Task.instances[name]) {
        console.log("Task " + name + " deleted");
        delete Task.instances[name];
    } else {
        console.log("There is no task with name " +
            name + " in the database!");
    }
};

Task.saveAll = function () {
    var tasksString="", error=false,
        nmrOfTasks = Object.keys( Task.instances).length;
    try {
        tasksString = JSON.stringify( Task.instances);
        localStorage["books"] = tasksString;
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log( nmrOfTasks + " books saved.");
};

Task.maybe = function () {
    Task.instances["wash the dings"] = new Book(
        {name: "wash", des:"you go to the dishdingdonger and dong the dingens"});
    Task.instances["Wah!"] = new Task(
        {name: "Wah!", des:"WALUIGI GOES WAH!"});
    Task.instances["Bonds"] = new Book(
        {name: "Bonds",des:"Bonds nonds having a stronk, call the bondulance"});
    Task.saveAll();
};

Task.clearData = function () {
    if (confirm("Do you really want to delete all task data?")) {
        localStorage["task"] = "{}";
    }
};