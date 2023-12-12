// Identifica el botó "Registrar" i "Loggegar" per al seu id
const registrarButton = document.getElementById("registrarButton");
const regsitrarButton2 = document.getElementById("loggegarButton");

// Agregar un controlador de events al botó
registrarButton.addEventListener("click", function() {
    // Redirigir a la página "registre.html"
    window.location.href = "registre.html";
});

//Agreaga un controlador de events al botó
regsitrarButton2.addEventListener("click",function(){
    //Redirigir a la pagina "login.html"
    window.location.href = "login.html";
});
