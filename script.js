document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(event.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    }
(function () {
    var count = -1;
    var tasks = [];
    (function getSaveData() {
        if (localStorage.getItem("tasks") !== null) {
            var ar = JSON.parse(localStorage.getItem("tasks"));
            console.log(ar)
            ar.map(function (elem) {
                console.log(elem)
                AddTask(elem.data,elem.details, elem.state);
            })
        }
    })()
    //listener on add button
    document.getElementById("addTask").addEventListener("submit", function (event) {
        event.preventDefault();
        var task = document.getElementById("task").value;
        var taskDetails = document.getElementById("details").value;
        if (task !== ""&&taskDetails!=="") {
            AddTask(task,taskDetails);
        }
    })
    //listener on clear button
    document.getElementById("edit").addEventListener("click", function () {
        Array.from(document.getElementsByClassName("card")).map(function (elem) {
            var b=document.createElement("button");
            b.classList.add("close");
            var i=document.createElement("i");
            i.setAttribute("class","fas");
            i.classList.add("fa-times-circle");
            b.prepend(i);
            elem.prepend(b)

        })
        del();
    })
    //listener on close button
   function del(){
    console.log("fire click");
    Array.from(document.getElementsByClassName("close")).map(function (element) {
        element.addEventListener("click",function(){
            console.log("delete click");
           delCard(element);
        })
        
    })
   }
   function delCard(element){
    var ar = JSON.parse(localStorage.getItem("tasks"));
    ar=ar.filter(function(elem){
        return elem.id!=element.parentElement.id
    })
    localStorage.setItem("tasks", JSON.stringify(ar))
    location.href="index.html";
   }
    Array.from(document.getElementsByClassName("area")).map(function (elem) {
        elem.addEventListener("drop", drop);
    })
    Array.from(document.getElementsByClassName("area")).map(function (elem) {
        console.log(elem);
        elem.addEventListener("dragover", allowDrop);
    })
    function AddTask(text,det, col = "hold") {
        count++;
        var card = document.createElement('section');
        card.setAttribute("class", "card");
        card.setAttribute("draggable", "true");
        card.setAttribute("id", count)
        var cardText = document.createElement('h3');
        var carddetails = document.createElement('p');
        cardText.appendChild(document.createTextNode(text));
        carddetails.appendChild(document.createTextNode(det));
        card.appendChild(cardText);
        card.appendChild(carddetails);
        card.addEventListener("dragstart", drag);
        document.getElementById(col).appendChild(card);
        tasks.push(
            {
                id:count,
                data: text,
                details:det,
                state: col
            });
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    function drag() {
        console.log("drag")
        event.dataTransfer.setData("task", event.target.id);
    }
    function drop() {
        var sec = event.target;
        var classes=Array.from(sec.classList);
        while (classes[1]!=="area") {
            sec=sec.parentElement;
            classes=Array.from(sec.classList);
        }
        var ID = event.dataTransfer.getData("task");
        sec.appendChild(document.getElementById(ID));
        console.log("you cary card",ID,sec.id)
        var ar = JSON.parse(localStorage.getItem("tasks"));
        console.log(ar)
        ar.map(function (elem) {
            console.log(elem)
            if (elem.id == ID) {

                elem.state = sec.id;
            }
        })
        localStorage.setItem("tasks", JSON.stringify(ar))
    }
    function allowDrop() {
        event.preventDefault();
        console.log("drop allow");
    }
})();