class Motos {
  constructor(nombre, patente, marca, proxMantenimiento) {
  this.nombre = nombre;
  this.patente = patente;
  this.marca = marca;
  this.proxMantenimiento = proxMantenimiento;
  }
}

const motoPablo = new Motos('Pablo', 'AAA11', 'Honda', 10000);
const motoRoland = new Motos('Roland', 'BBB22', 'Yamaha', 2500);
const motoFernando = new Motos('Fernando', 'CCC33', 'Suzuki', 5000);
const motoHector = new Motos('Hector', 'DDD44', 'Kawasaki', 25000);

const arrayMotos = [];

arrayMotos.push(motoPablo);
arrayMotos.push(motoRoland);
arrayMotos.push(motoFernando);
arrayMotos.push(motoHector);

console.log(arrayMotos);

document.getElementById("link-main").addEventListener("click", function(event) {
  event.preventDefault();

  function menu() {
    alert('Base de datos Motos del Taller');
    let opcion = parseInt(
      prompt(
      'Ingrese una opción: \n 1) Ingresar Moto nueva \n 2) Eliminar moto \n 3) Modificar moto \n 4) Consultar prox. mantenimiento moto \n 5) Salir'
      )
    );
    return opcion;
  }

  function nuevaMoto() {
    let nombre = prompt('Ingrese el nombre del cliente: ');
    let patente = prompt('Ingrese la patente de la Moto: ');
    let marca = prompt('Ingrese la marca de la Moto: ');
    let proxMantenimiento = parseInt(prompt('Ingrese el kilometraje del próximo mantenimiento de la moto: '));
    let moto = new Motos(nombre, patente, marca, proxMantenimiento);
    arrayMotos.push(moto);
    console.log(arrayMotos);
  }

  function eliminarMoto() {
    let patente = prompt('Ingrese la patente de la moto a eliminar: ');
    let moto = arrayMotos.find((moto) => moto.patente === patente);
    let indice = arrayMotos.indexOf(moto);
    arrayMotos.splice(indice, 1);
    console.log(arrayMotos);
  }

  function modificarMoto() {
    let patente = prompt('Ingrese la patente de la moto a modificar: ');
    let moto = arrayMotos.find((moto) => moto.patente === patente);
    let indice = arrayMotos.indexOf(moto);
    let nombre = prompt('Ingrese el nombre del cliente: ');
    let marca = prompt('Ingrese la marca de la moto: ');
    let proxMantenimiento = parseInt(prompt('Ingrese el kilometraje del próximo mantenimiento de la moto: '));
    let motoModificada = new Motos(nombre, patente, marca, proxMantenimiento);
    arrayMotos.splice(indice, 1, motoModificada); 
    console.log(arrayMotos);
  }

  function consultaMantenimiento() {
    let patente = prompt('Ingrese la patente de la moto: ');
    let moto = arrayMotos.find((moto) => moto.patente === patente);
    let mantenimiento = parseInt(moto.proxMantenimiento);
    let kmActual = parseInt(prompt('Ingrese el kilometraje actual: '));
    let kmFaltantes = mantenimiento - kmActual;
    let kmExceso = kmFaltantes * -1
    if (kmFaltantes > 0) {alert (`El proximo mantenimiento le corresponde a los ${mantenimiento} kms, en ${kmFaltantes} kilómetros más`)}
    else {alert (`USTED SE HA PASADO EN ${kmExceso} KMS, FAVOR REALIZAR MANTENIMIENTO A LA BREVEDAD`)}
    console.log(moto.proxMantenimiento)
  }

  function salir() {
    alert('Gracias por usar nuestro programa');
  }

  let opcion = menu();
  switch (opcion) {
    case 1:
      nuevaMoto();
      break;
    case 2:
      eliminarMoto();
      break;
    case 3:
      modificarMoto();
      break;
    case 4:
      consultaMantenimiento();
      break;
    case 5:
      salir();
      break;
    default:
      alert('Seleccione una opción correcta');
      break;
  }

  console.log("Se hizo clic en la base de datos");
});
