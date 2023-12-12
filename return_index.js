// Identificar los campos y el botón de envío
const nombreField = document.getElementById("nombre");
const correoField = document.getElementById("correo");
const passwordField = document.getElementById("password");
const submitButton = document.getElementById("submitButton");

// Agregar un controlador de eventos al botón de envío
submitButton.addEventListener("click", function(event) {
    // Verificar si todos los campos están rellenados y si el correo tiene un formato válido
    if (nombreField.value.trim() === "" || correoField.value.trim() === "" || passwordField.value.trim() === "") {
        event.preventDefault(); // Detener la acción predeterminada (envío del formulario)
        alert("Si us plau, completi tots els camps abans d'enviar el formulari.");
    } else {
        // Validar el formato del correo electrónico
        if (validarFormatoCorreo(correoField.value)) {
             // Si todos los campos están rellenados y el correo tiene un formato válido, redirigir al index.html
             window.location.href = "index.html";
        } else {
            event.preventDefault(); // Detener la acción predeterminada (envío del formulario)
            alert("Si us plau, introdueixi un correu electrònic vàlid.");
        }
    }
});

// Funció per validar el format del correo electrónic
function validarFormatoCorreo(email) {
    // Expresión regulada per validar el format de correo electrónic
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}