function Shw(n) {if (self.moveBy) {for (i = 35; i > 0; i--) {for (j = n; j > 0; j--) {self.moveBy(1,i);self.moveBy(i,0);self.moveBy(0,-i);self.moveBy(-i,0); } } }}

function checkCredentials() {
    let user = document.getElementById("loginMail").value;
    let pw = document.getElementById("loginPW").value;

    if(pw == null || pw == "") {
        alert("Please put in a password!");
        return;
    }

    let saveCredentials = document.getElementById("rememberMe").checked;

    if(saveCredentials) {
        localStorage.setItem("user", user);
        localStorage.setItem("password", pw);
    }

    let data = new FormData();
    data.append('user', user);
    data.append('pwd', pw);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', false);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response

        console.log(this.responseText);
    };
    xhr.send(data);

}

function reloadLocalStorage() {
    let user = localStorage.getItem("user");
    let pw = localStorage.getItem("password");

    if(user != null && pw != null) {
        document.getElementById("loginMail").value = user;
        //document.getElementById("loginPW").value = pw;
    }

}

function logout() {
    window.location.replace("/index.html")
    // TODO: uncomment in production
    // localStorage.removeItem("password");
}

if(window.location.pathname.endsWith("/home.html")) {
    document.getElementById("logout").addEventListener("click", logout);
}

if(window.location.pathname.endsWith("/index.html")) {
    document.getElementById("login").addEventListener("click", checkCredentials);
    document.addEventListener("DOMContentLoaded", reloadLocalStorage);
}