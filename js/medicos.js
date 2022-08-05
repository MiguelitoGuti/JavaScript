const medicos = [];
const turnos = [];

class Medico {
    constructor(ident, nombre, matricula) {
        this.ident = ident;
        this.nombre = nombre;
        this.matricula = matricula;
    }
}

class Turno {
    constructor(id, dia, mes, anio, fecha, hora, paciente, email, estado, medico, diaturno) {
        this.id = id;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente;
        this.email = email;
        this.estado = estado;
        this.medico = medico;
        this.diaturno = diaturno;
    }
}

date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;

let acumulador = ``;

const medicosAlmacenadosSesion = localStorage.getItem("MedicosAlmacenados");
const parseMedicos = JSON.parse(medicosAlmacenadosSesion);

for (const objetoMedico of parseMedicos)
    medicos.push(new Medico(objetoMedico.ident, objetoMedico.nombre, objetoMedico.matricula));

medicos.forEach((medicoaux) => {

    acumulador += `<tr>
        
        <td>
             <button id="crear-turnos" class="botonesOpciones" onclick="crearTurnos(${medicoaux.ident},${month},${year})">crear agenda</button>
        </td>
        <td>${medicoaux.ident}</td>
        <td>${medicoaux.nombre}</td>
        <td>${medicoaux.matricula}</td>
        </tr>`;

});

document.getElementById('listado-medicos').innerHTML = acumulador;

function crearTurnos(medicoturnoid, mes, anio) {

    let finMes = 31;
    for (let indice = 1; indice <= finMes; indice++) {
        crearTurnoDia(medicoturnoid, indice, mes, anio);
    }

}

function crearTurnoDia(medicoTurnoId, dia, mes, anio) {

    let horaInicial = 8;
    let horaInicialtxt = '';
    let fechaTurnoFormat = dia.toString() + '/' + mes.toString() + '/' + anio.toString();
    let fechaTurnoTxt = anio.toString() + '-' + mes.toString() + '-' + dia.toString();
    let fechaTurno = new Date(fechaTurnoTxt);
    let diaTurno = fechaTurno.getDay();
    if (diaTurno == 1 || diaTurno == 2 || diaTurno == 3 || diaTurno == 4 || diaTurno == 5){

        for (let indice = 0; indice <= 5; indice++) {

            horaInicial = horaInicial + 1;
            horaInicialtxt = horaInicial.toString();
            horaInicialtxt = horaInicialtxt.padStart(2, '0') + ':00';
            indiceTurno = dia.toString() + mes.toString() + anio.toString() + medicoTurnoId.toString() + horaInicial.toString();
            turnos.push(new Turno(indiceTurno, dia, mes, anio, fechaTurnoFormat, horaInicialtxt, '', '', 'P', medicoTurnoId,diaTurno));
        }

    }
    
    localStorage.setItem('agendaCreada', 'S');
    const guardarTurnosSesion = JSON.stringify(turnos);
    localStorage.setItem("TurnosAlmacenados", guardarTurnosSesion);
}