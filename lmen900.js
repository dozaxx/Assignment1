function hideEverything() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("news-page").style.display = "none";
    document.getElementById("displays-page").style.display = "none";
    document.getElementById("guest-book-page").style.display = "none";
}

function showHome() {
    hideEverything();
    document.getElementById("home-page").style.display = "block";
}

function showNews() {
    hideEverything();
    document.getElementById("news-page").style.display = "block";
    getNews();
}

function showDisplays() {
    hideEverything();
    document.getElementById("displays-page").style.display = "block";
    getDisplays();
}

function showGuestBook() {
    hideEverything();
    document.getElementById("guest-book-page").style.display = "block";

}

function getNews() {
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        let htmlString = "";
        resp.forEach(element => {
            htmlString += "<div><h2>" + element.titleField + "</h2><hr><p><img class=\"news-img\" src=\"" + element.enclosureField.urlField +
             "\"></img></p> <p>" + element.pubDateField + "</p>" + "<p>" + element.descriptionField + "</p></div><br>";
            });
        document.getElementById("news-page").innerHTML = htmlString;
        htmlString = "";
    }
    xhr.send(null);
}

function getDisplays() {
    const xhr = new XMLHttpRequest();
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        console.log(resp);
        let htmlString = "<ul id = \"myUL\" style = \"list-style: none;\">";
        resp.forEach(element => {
            htmlString += "<li class=\"myLI\"><h2>" + element.Title + "</h2><hr><img src=\"http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + element.ItemId +
            "\" width = \"500\"><p>" + element.Description + "</p></li>";
            });
            htmlString += "</ul>"
        document.getElementById("allDisplays").innerHTML = htmlString;
        htmlString= "";
    }
    xhr.send(null);
}

function searchDisplays(){
    const xhr = new XMLHttpRequest();
    const term = document.getElementById('myInput').value;
    console.log(term);
    const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term=" + term;
    xhr.open("GET", uri, true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        console.log(resp);
        let htmlString = "<ul id = \"myUL\" style = \"list-style: none;\">";
        resp.forEach(element => {
            htmlString += "<li class=\"myLI\"><h2>" + element.Title + "</h2><hr><img src=\"http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + element.ItemId +
            "\" width = \"500\"><p>" + element.Description + "</p></li>";
            });
            htmlString += "</ul>"
        document.getElementById("allDisplays").innerHTML = htmlString;
        htmlString= "";
    }
    xhr.send(null);
}

function postGuestBook () {
    const name = document.getElementById("form-name").value;
    const comment = document.getElementById("form-comment").value;
    const xhr = new XMLHttpRequest();
    const uri = 'http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name=' + name;
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = () => {
        document.getElementById("form-name").value = "";
        document.getElementById("form-comment").value = "";
        document.getElementById('iframeid').src = document.getElementById('iframeid').src
        }
    xhr.send(JSON.stringify(comment));
    
}
