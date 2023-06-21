let motos;

// Función para cargar los datos de las motos desde el archivo JSON
async function cargarMotos() {
    try {
        const response = await fetch('motos.json');
        motos = await response.json();
        console.log('Motos cargadas:', motos);
    } catch (error) {
        console.log('Error al cargar las motos:', error);
    }
}

// Función para guardar los datos de las motos en el archivo JSON
async function guardarMotos() {
    try {
        const response = await fetch('motos.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(motos)
        });
        console.log('Motos guardadas correctamente');
    } catch (error) {
        console.log('Error al guardar las motos:', error);
    }
}

// Función para mostrar el formulario de agregar moto
function mostrarFormulario() {
    const formularioDiv = document.getElementById("formularioDiv");

    // Crear el formulario
    const form = document.createElement("form");
        form.id = "agregarForm";

    const nombreLabel = document.createElement("label");
        nombreLabel.for = "nombreInput";
        nombreLabel.textContent = "Nombre Cliente:";
    const nombreInput = document.createElement("input");
        nombreInput.type = "text";
        nombreInput.id = "nombreInput";
        nombreInput.required = true;
    const marcaLabel = document.createElement("label");
        marcaLabel.for = "marcaInput";
        marcaLabel.textContent = "Marca:";
    const marcaInput = document.createElement("input");
        marcaInput.type = "text";
        marcaInput.id = "marcaInput";
        marcaInput.required = true;
    const modeloLabel = document.createElement("label");
        modeloLabel.for = "modeloInput";
        modeloLabel.textContent = "Modelo:";
    const modeloInput = document.createElement("input");
        modeloInput.type = "text";
        modeloInput.id = "modeloInput";
        modeloInput.required = true;
    const kmUltimoServicioLabel = document.createElement("label");
        kmUltimoServicioLabel.for = "kmUltimoServicioInput";
        kmUltimoServicioLabel.textContent = "Kilometraje del Último Servicio:";
    const kmUltimoServicioInput = document.createElement("input");
        kmUltimoServicioInput.type = "number";
        kmUltimoServicioInput.id = "kmUltimoServicioInput";
        kmUltimoServicioInput.required = true;

    const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Agregar Moto";

    form.appendChild(nombreLabel);
    form.appendChild(nombreInput);
    form.appendChild(marcaLabel);
    form.appendChild(marcaInput);
    form.appendChild(modeloLabel);
    form.appendChild(modeloInput);
    form.appendChild(kmUltimoServicioLabel);
    form.appendChild(kmUltimoServicioInput);
    form.appendChild(submitButton);

    formularioDiv.appendChild(form);
}

// Función para ocultar el formulario de agregar moto
function ocultarFormulario() {
    const formularioDiv = document.getElementById("formularioDiv");
    formularioDiv.innerHTML = "";
}

// Función para agregar una moto nueva
function agregarMoto(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreInput").value;
    const marca = document.getElementById("marcaInput").value;
    const modelo = document.getElementById("modeloInput").value;
    const kmUltimoServicio = parseInt(document.getElementById("kmUltimoServicioInput").value);

    // Agregar la moto a la base de datos
    const nuevaMoto = { nombre, marca, modelo, kmUltimoServicio };
    motos.push(nuevaMoto);
    console.log("Moto agregada:", nuevaMoto);

    // Guardar las motos en el archivo JSON
    guardarMotos();

    // Limpiar el formulario después de agregar la moto
    document.getElementById("agregarForm").reset();

    // Ocultar el formulario
    ocultarFormulario();
}

// Función para eliminar una moto
function eliminarMoto() {
    const index = prompt("Ingresa el índice de la moto a eliminar (0 - " + (motos.length - 1) + "):");

// Verificar si el índice es válido
    if (index >= 0 && index < motos.length) {
        const motoEliminada = motos.splice(index, 1);
        console.log("Moto eliminada:", motoEliminada);

// Guardar las motos en el archivo JSON después de eliminar
        guardarMotos();
    } else {
        console.log("Índice inválido");
    }
}

// Función para consultar el próximo mantenimiento
function consultarProximoMantenimiento() {
// Lógica para calcular el próximo mantenimiento
// ...
console.log("Próximo mantenimiento:");
}

// Event Listeners
document.getElementById("agregarBtn").addEventListener("click", mostrarFormulario);
document.getElementById("agregarForm").addEventListener("submit", agregarMoto);
document.getElementById("eliminarBtn").addEventListener("click", eliminarMoto);
document.getElementById("consultarBtn").addEventListener("click", consultarProximoMantenimiento);

// Cargar las motos al cargar la página
window.addEventListener("load", function() {
    cargarMotos();
});
