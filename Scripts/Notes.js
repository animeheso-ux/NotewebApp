const UsernameInput = document.getElementById("UsernameBox");
const PasswordInput = document.getElementById("PasswordBox");
const SignupButton = document.getElementById("SignupButton");
const LoginButton = document.getElementById("LoginButton");
const CreateButton = document.getElementById("CreateButton");




async function Login() {

        if (UsernameInput.value.length == 0 || PasswordInput.value.length == 0) {
        alert("Username or Password must not be empty!")
        return
    }

     const response =  await fetch("/Login",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({Username : UsernameInput.value?.trim(),Password : PasswordInput.value?.trim()})
     })

     const Data = await response.json();


    alert(Data.message);


    if (Data.message == "Login Successful!") {
        sessionStorage.setItem("User",UsernameInput.value)
        window.location.href = "NotesWeb/index.html"
    }
}

async function Signup() {

    if (UsernameInput.value.length == 0 || PasswordInput.value.length == 0) {
        alert("Username or Password must not be empty!")
        return
    }

    if(UsernameInput.value == PasswordInput.value) {
        alert("Username and password must not match!")
        return
    }

    if (PasswordInput.value.length < 8) {
        alert("Password must be above or exact 8 characters long!")
        return
    }





        const response =  await fetch("/CreateAccount",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({Username : UsernameInput.value?.trim(),Password : PasswordInput.value?.trim()})
     })

     const Data = await response.json();

     if (Data.message == "Account succesfully created!") {
        window.location.reload()
     }


     alert(Data.message);
}


LoginButton.onclick = function() {
    Login()
}


SignupButton.onclick = function() {
    LoginButton.style.opacity = 0;
    CreateButton.style.opacity = 1;
    CreateButton.style.pointerEvents = "auto"
}


CreateButton.onclick = function() {
    Signup()
}




