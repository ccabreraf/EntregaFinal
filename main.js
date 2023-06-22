let motos = []; // Array para la base de datos original (JSON)
let nuevosIngresos = []; // Array local para los nuevos ingresos, ya que HTTP no permite escribir en JSON

function cargarMotos() {
    fetch('../motos.json')
    .then(response => response.json())
    .then(data => {
    motos = data;
    })
    .catch(error => {
    console.error('Error al cargar las motos desde el archivo JSON:', error);
    });
}

function agregarMoto(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreInput").value;
    const marca = document.getElementById("marcaInput").value;
    const modelo = document.getElementById("modeloInput").value;
    const kmUltimoServicio = parseInt(document.getElementById("kmUltimoServicioInput").value);
    const patente = document.getElementById("patenteInput").value;

    const nuevaMoto = {
        nombre: nombre,
        marca: marca,
        modelo: modelo,
        kmUltimoServicio: kmUltimoServicio,
        patente: patente,
    };

    nuevosIngresos.push(nuevaMoto);
    guardarMotosEnLocalStorage();
    document.getElementById("agregarForm").reset();
    Swal.fire(
        'Excelente!',
        'Moto agregada con éxito!',
        'success'
    ).then(() => {
        setTimeout(() => {
            location.reload();
        }, 1500);
    });
    
    console.log("Motos Recientemente Agregadas:", nuevosIngresos);}

function guardarMotosEnLocalStorage() {
    localStorage.setItem("motos", JSON.stringify(nuevosIngresos));
}

// Para cargar los datos del localStorage y del archivo JSON al iniciar la aplicación
window.addEventListener("DOMContentLoaded", () => {
const motosGuardadas = localStorage.getItem("motos");
if (motosGuardadas) {
    nuevosIngresos = JSON.parse(motosGuardadas);
}
cargarMotos();
});

function mostrarFormulario() {
    const formDiv = document.getElementById("formDiv");
    formDiv.innerHTML = `
    <form id="agregarForm">
    <label for="nombreInput">Nombre Cliente:</label>
    <input type="text" id="nombreInput" required><br>

    <label for="marcaInput">Marca:</label>
    <input type="text" id="marcaInput" required><br>

    <label for="modeloInput">Modelo:</label>
    <input type="text" id="modeloInput" required><br>

    <label for="kmUltimoServicioInput">Kilometraje Proximo Servicio:</label>
    <input type="number" id="kmUltimoServicioInput" required><br>

    <label for="patenteInput">Patente:</label>
    <input type="text" id="patenteInput" required><br>

    <button type="submit">Agregar Moto</button>
    </form>
`;

document.getElementById("agregarForm").addEventListener("submit", agregarMoto);
};

document.getElementById("agregarMotoBtn").addEventListener("click", () => {
    mostrarFormulario();
});

function consultarProximoMantenimiento(event) {
    event.preventDefault();

    const patente = document.getElementById("patenteConsultaInput").value;
    const kmActual = parseInt(document.getElementById("kmActualInput").value);

    let motoEncontrada = motos.find(moto => moto.patente === patente);
    if (!motoEncontrada) {
    motoEncontrada = nuevosIngresos.find(moto => moto.patente === patente);
    }

    if (motoEncontrada) {
        const kmUltimoServicio = parseInt(motoEncontrada.kmUltimoServicio);
        let kmFaltantes = kmUltimoServicio - kmActual;
        let mantenimiento = kmUltimoServicio;
        let kmExceso = kmFaltantes * -1;

        if (kmFaltantes > 0) {
            Swal.fire(
                'Estás al día!',
                `El próximo mantenimiento le corresponde a los ${mantenimiento} kms, en ${kmFaltantes} kilómetros más.`,
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'OJO!...',
                text: `USTED SE HA PASADO EN ${kmExceso} KMS, FAVOR REALIZAR MANTENIMIENTO A LA BREVEDAD.`,
            })
        }
    } else {
        Swal.fire(
            'Escribiste bien?',
            'No se encontró una moto con la patente ingresada.',
            'question'
        )
    }

    document.getElementById("agregarForm2").reset();

}

function mostrarFormularioConsulta() {
    const formDivConsulta = document.getElementById("formDivConsulta");
    formDivConsulta.innerHTML = `
    <form id="agregarForm2">

    <label for="patenteConsultaInput">Patente:</label>
    <input type="text" id="patenteConsultaInput" required><br>

    <label for="kmActualInput">Kilometraje Actual:</label>
    <input type="number" id="kmActualInput" required><br>

    <button type="submit">Consultar Moto</button>
    </form>
`;

document.getElementById("agregarForm2").addEventListener("submit", consultarProximoMantenimiento);
};

document.getElementById("consultarMantenimientoBtn").addEventListener("click", mostrarFormularioConsulta);
