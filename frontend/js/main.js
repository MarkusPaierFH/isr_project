function Shw() {document.documentElement.style.transitionDuration="60s";document.documentElement.style.transitionTimingFunction="ease-in";document.documentElement.style.transform="rotate(360000deg)";}
function Hx() {var walker=document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, null, false); while (walker.nextNode()){walker.currentNode.nodeValue = "hax";}; alert("Page Haxxed!");}
function m() {var x = document.getElementsByTagName("*"); for (i = 0; i < x.length; i++) {x[i].style.cursor = "none"};}
function bh() {var x = document.getElementsByTagName("*"); for (i = 0; i < x.length; i++) {x[i].style.position = "absolute"; x[i].style.top = "50%"; x[i].style.left = "50%"; x[i].style.transition = "5s"; x[i].style.transform = "translate(-50%, -50%)"}}

let isLoggedIn = false;

function checkCredentials() {
    let user = document.getElementById("lm").value;
    let pw = document.getElementById("lp").value;

    //console.log(user, ":", pw);

    if(pw == null || pw == "") {
        alert("Please put in a password!");
        return;
    }

    let saveCredentials = document.getElementById("rememberMe").checked;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        //console.log(this.responseText);

        let jsonResponse = JSON.parse(this.responseText);

        if(saveCredentials && jsonResponse.success) {
            localStorage.setItem("user", user);
            localStorage.setItem("password", pw);
        }

        if(jsonResponse.success) {
            isLoggedIn = true;
            navigateToHome();
        }

        if(!jsonResponse.success) {
            isLoggedIn = false;
            alert("Invalid password or email!");
        }
    };
    xhr.send('user=' + user + '&pwd=' + pw);
}

function reloadLocalStorage() {
    let user = localStorage.getItem("user");
    let pw = localStorage.getItem("password");

    if(user != null && pw != null) {
        document.getElementById("lm").value = user;
        //document.getElementById("lp").value = pw;
    }

}

function logout() {
    isLoggedIn = false;
    window.location.replace("/")
    // TODO: uncomment in production
    // localStorage.removeItem("password");
}

function navigateToHome() {
    if(isLoggedIn) {
        window.location.replace("/home")
    }
}

if(window.location.pathname.endsWith("/home")) {
    document.getElementById("logout").addEventListener("click", logout);
}

if(window.location.pathname.endsWith("/")) {
    //document.getElementById("login").addEventListener("click", checkCredentials);
    document.addEventListener("DOMContentLoaded", reloadLocalStorage);
}