
const AddButton = document.getElementById("AddButton");
const RemoveButton = document.getElementById("RemoveButton");
const UsernameText = document.getElementById("UsernameText");
const LogoutButton = document.getElementById("LogoutButton");
var Active = false;
var CoordX = null;
var CoordY = null;
var Note = null;
var deletebutton = null;


var Colors = {
    "Red" : "#FF0000",
    "Green" : "#04AA6D",
    "Blue" :  "#0000FF",
    "White" : "#ffffff"
}



async function CreateNote(note) {
    console.log(note.getBoundingClientRect().left)
    const response = await fetch("/SaveNote",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({User_ID : sessionStorage.getItem("User")})
    })

    const Data = await response.json()

    
}


//Mouse DOM FUNCTIONS



document.addEventListener("mousemove",function(event) {
    if (event.target.className != "Note") {return}


    if (document.getElementById("deletebutton")) return; // don't create duplicates

    deletebutton = document.createElement("button")
    deletebutton.id = "deletebutton"  // give it an id to track it
    deletebutton.style.position = "absolute"
    deletebutton.style.left = event.target.style.left 
    deletebutton.style.top = (parseInt(event.target.style.top) - 35) + "px"
    deletebutton.textContent = "Delete?"
    document.body.appendChild(deletebutton);

    deletebutton.onclick = function() {
        console.log("Remove")
        document.body.removeChild(event.target);
        document.body.removeChild(deletebutton);  // also remove the button
    }

    event.target.onmouseleave = function() {

        setTimeout(() => {
            const Deletebtn = document.getElementById("deletebutton")
            if (Deletebtn) {document.body.removeChild(Deletebtn)}
        },1000);
    }
    
}) 


LogoutButton.onclick = function() {
    if (sessionStorage.getItem("User")) {
        sessionStorage.removeItem("User")
    }
        window.location.href = "../index.html"
}



document.addEventListener("contextmenu", function (event) {
    event.preventDefault();



        if (event.target.className != "Note") {return}

        if (document.getElementById("NoteMenu")) {return}

        const NoteMenu = document.createElement("div")
        NoteMenu.classList.add("NoteMenu")
        NoteMenu.id = "NoteMenu"
        NoteMenu.style.top = event.clientY
        NoteMenu.style.left = event.clientX

        const EditButton = document.createElement("button")
        EditButton.classList.add("Edit")
        EditButton.id = "EditButton"
        EditButton.textContent = "Edit Text"

        EditButton.onclick = function() {

            if (EditButton.textContent == "Edit Text") {
                EditButton.textContent = "Edit BG"
            }else {
                EditButton.textContent = "Edit Text"
            }
        }



        NoteMenu.append(EditButton)


        document.body.appendChild(NoteMenu)

        for (let key in Colors) {

            const ColorButton = document.createElement("button")
            ColorButton.classList.add("SmallBox")
            ColorButton.style.color = Colors[key]
            ColorButton.style.backgroundColor = Colors[key]


            ColorButton.onclick = function() {
                if (EditButton.textContent == "Edit Text") {
                    event.target.style.color = Colors[key]
                }else {
                    console.log("Change BG")
                    event.target.style.backgroundColor = Colors[key]
                }


            }

            NoteMenu.appendChild(ColorButton)
        }


        NoteMenu.onmouseleave = function() {
            const N_MENU = document.getElementById("NoteMenu")
            if (N_MENU) {document.body.removeChild(N_MENU)}
        }

});







UsernameText.textContent = "Welcome!" + " " + sessionStorage.getItem("User")



    function OnClick() {
            if (Active == true) {
            RemoveMouseMove()
            document.removeEventListener("click",OnClick)
            Active = false;
    }      }


function GetMousePosition(event) {
    CoordX = event.clientX 
    CoordY  = event.clientY 

    if (Note != null) {
        console.log("move")
        Note.style.top = CoordY
        Note.style.left = CoordX





    }

        document.addEventListener("click",OnClick)






}


function RemoveMouseMove() {
        console.log("Deactivate")
        Active = false;
        document.removeEventListener("mousemove",GetMousePosition)
}





AddButton.onclick = function() {
    if (Active == false) {
        Active = true
        console.log("Active")
       document.addEventListener("mousemove",GetMousePosition)


       Note = document.createElement("textarea")
       Note.className = "Note"
       document.body.appendChild(Note)
       CreateNote(Note)




    }else {
        RemoveMouseMove()
    }
}


RemoveButton.onclick = function() {
    if (Active == false) {

    }
}