// Crear Turnos para dia de la fecha
const medicos = [];
const turnos = [];
const pacientes = [];

class Turno {
    constructor(id, dia, mes, anio, fecha, hora, paciente, email, estado, medico, diaturno) {
        this.id = id;
        this.dia = dia;
        this.mes = mes;
        this.anio = anio;
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente;
        this.mail = email;
        this.estado = estado;
        this.medico = medico;
        this.diaturno = diaturno;
    }
}

class Medico {
    constructor(ident, nombre, matricula) {
        this.ident = ident;
        this.nombre = nombre;
        this.matricula = matricula;
    }
}

class Paciente {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// Traer medicos sesion
const medicosAlmacenadosSesion = localStorage.getItem("MedicosAlmacenados");
const parseMedicos = JSON.parse(medicosAlmacenadosSesion);

for (const objetoMedico of parseMedicos)
    medicos.push(new Medico(objetoMedico.ident, objetoMedico.nombre, objetoMedico.matricula));

// Traer pacientes sesion

const PacientesAlmacenadosSesion = localStorage.getItem("PacientesAlmacenados");
const parsePaciente = JSON.parse(PacientesAlmacenadosSesion);

for (const objetoPaciente of parsePaciente)
    pacientes.push(new Paciente(objetoPaciente.id, objetoPaciente.name, objetoPaciente.email));

let acumulador = ``;

// crear turnos obtenidos de sesion


let agendaCreada = localStorage.getItem('agendaCreada')
if (agendaCreada == 'S') {

    const turnosAlmacenadosSesion = localStorage.getItem("TurnosAlmacenados");
    const parseTurnos = JSON.parse(turnosAlmacenadosSesion);

    for (const objetoturno of parseTurnos) {
        turnos.push(new Turno(objetoturno.id, objetoturno.dia, objetoturno.mes, objetoturno.anio, objetoturno.fecha, objetoturno.hora, objetoturno.paciente, objetoturno.email, objetoturno.estado, objetoturno.medico, objetoturno.diaturno));
        /*if (objetoturno.dia == dia && objetoturno.mes == mes && objetoturno.anio == anio && objetoturno.medico == medicoId) {
            turnos.push(new Turno(objetoturno.id, objetoturno.dia, objetoturno.mes, objetoturno.anio, objetoturno.fecha, objetoturno.hora, objetoturno.paciente, objetoturno.dni, objetoturno.estado, objetoturno.medico, objetoturno.diaturno));
        };*/
    }

}

crearComboMedico();
crearComboPacientes();
crearDiasMes();


// funciones

function solicitarDatos(turnosesion) {
    localStorage.setItem('TurnoId', turnosesion);// guardar en sesion
}

function crearDiasMes() {
    let finMes = 31;
    let dias = ``;
    dias += `<button id="dia-turno" class="formatodia"></button>`
    for (let indice = 1; indice <= finMes; indice++) {
        dias += `<button id="dia-turno" class="formatodia" onclick="crearTurnosDia(${indice},8,2022)">${indice}</button>`
    }
    dias += `<button id="dia-turno" class="formatodia"></button>`;
    dias += `<button id="dia-turno" class="formatodia"></button>`;
    dias += `<button id="dia-turno" class="formatodia"></button>`;
    document.getElementById('dias-mes').innerHTML = dias;
}

function crearTurnosDia(dia, mes, anio) {

    // crear titulos medicos
    let medicoId = document.getElementById('combo-medico').value;
    if (medicoId != 99) {

        document.getElementById('nombre-medico1').innerHTML = 'MEDICO: ' + medicos[medicoId].nombre;

        let turnosFiltrados = [];
        turnosFiltrados = turnos.filter((turnoFiltro) => turnoFiltro.dia == dia && turnoFiltro.mes == mes && turnoFiltro.anio == anio && turnoFiltro.medico == medicoId);
        acumulador = ``;
        turnosFiltrados.forEach((turnoindividual) => {

            let estadoTurno = turnoindividual.estado;
            switch (estadoTurno) {

                case 'A':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                        <button id="asignar-turno" class="botonesTurnosAnulado">${turnoindividual.fecha} ${turnoindividual.hora} - ANULADO</button>
                        <button id="anular-turno" class="botonOculto"></button>
                        <button id="borrar-paciente" class="botonOculto"></button>
                        </div>`;
                    break;

                case 'O':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                        <button id="asignar-turno" class="botonesTurnosOcupado">${turnoindividual.fecha} ${turnoindividual.hora} - PACIENTE: ${turnoindividual.paciente}</button>
                        <button id="anular-turno" class="botonOculto"></button>
                        <button id="borrar-paciente" class="botonesQuitarPaciente" onclick="quitarPersonaTurno(${turnoindividual.id})">Borrar Pac</button>
                        </div>`;
                    break;

                case 'P':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                        <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${turnoindividual.id})">${turnoindividual.fecha} ${turnoindividual.hora} - DISPONIBLE</button>
                        <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${turnoindividual.id})">Anular</button>
                        <button id="borrar-paciente" class="botonOculto"></button>
                        </div>`;
                    break;
            }
        });
        document.getElementById('turnos-medico1').innerHTML = acumulador;

    } else {

        acumulador = ``;
        document.getElementById('turnos-medico1').innerHTML = acumulador;
        document.getElementById('nombre-medico1').innerHTML = acumulador;
    }

};


function confirmarDatos() {

    let idturno = localStorage.getItem('TurnoId'); // Recupero de sesion
    let idPersona = document.getElementById("combo-persona").value;

    if (idPersona != 99) {

        // Asigno los datos ingresados en el turno seleccionado y cambio estado de turno a Ocupado
        
        const posicionTurno = turnos.findIndex(turnoaux => {
            return turnoaux.id == idturno;
        });

        const posicionPaciente = pacientes.findIndex(pacienteaux => {
            return pacienteaux.id == idPersona;
        });
        turnos[posicionTurno].email = pacientes[posicionPaciente].email;
        turnos[posicionTurno].paciente = pacientes[posicionPaciente].name;
        turnos[posicionTurno].estado = 'O';

        // actualizo datos sesion
        const guardarTurnosConfirmacion = JSON.stringify(turnos);
        localStorage.setItem("TurnosAlmacenados", guardarTurnosConfirmacion);

        location.reload();
    }
}

function contarTurnosDisponibles(opcion) {

    let cantTurnosDisp = 0;
    switch (opcion) {

        case 0:
            for (let i = 0; i <= 5; i++) {

                let estado = turnos[i].estado;
                estado == 'P' ? cantTurnosDisp++ : cantTurnosDisp;

            }
            document.getElementById("TxtDisp1").innerHTML = "DISPONIBLES: " + cantTurnosDisp;
            break;

        case 1:

            for (let i = 6; i <= 11; i++) {

                let estado = turnos[i].estado;
                estado == 'P' ? cantTurnosDisp++ : cantTurnosDisp;
            }
            document.getElementById("TxtDisp2").innerHTML = "DISPONIBLES: " + cantTurnosDisp;
            break;

        case 2:

            for (let i = 12; i <= 17; i++) {

                let estado = turnos[i].estado;
                estado == 'P' ? cantTurnosDisp++ : cantTurnosDisp;
            }
            document.getElementById("TxtDisp3").innerHTML = "DISPONIBLES: " + cantTurnosDisp;
            break;

    }

}

function contarTurnosOtorgados(opcion) {

    let cantTurnosOtorg = 0;
    switch (opcion) {

        case 0:

            for (let i = 0; i <= 5; i++) {

                let estado = turnos[i].estado;
                estado == 'O' ? cantTurnosOtorg++ : cantTurnosOtorg;
            }
            document.getElementById("TxtOtor1").innerHTML = "OTORGADOS: " + cantTurnosOtorg;
            break;

        case 1:

            for (let i = 6; i <= 11; i++) {

                let estado = turnos[i].estado;
                estado == 'O' ? cantTurnosOtorg++ : cantTurnosOtorg;
            }
            document.getElementById("TxtOtor2").innerHTML = "OTORGADOS: " + cantTurnosOtorg;
            break;

        case 2:

            for (let i = 12; i <= 17; i++) {

                let estado = turnos[i].estado;
                estado == 'O' ? cantTurnosOtorg++ : cantTurnosOtorg;
            }
            document.getElementById("TxtOtor3").innerHTML = "OTORGADOS: " + cantTurnosOtorg;
            break;
    }

}

function fechaHoy() {
    // Funcion para buscar la fecha de actual
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    fechaActual = day + "/" + month + "/" + year;
    return fechaActual;
}

function anularTurno(idturno) {

    Swal.fire({
        title: 'Confirma Anulacion del Turno?',
        icon: 'warning',
        showCloseButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#3085d6',
    }).then((result) => {

        if (result.isConfirmed) {

            // Borro paciente y cambio estado a Anulado
            const posicionTurno = turnos.findIndex(turnoaux => {
                return turnoaux.id == idturno;
            });
            turnos[posicionTurno].email = '';
            turnos[posicionTurno].paciente = '';
            turnos[posicionTurno].estado = 'A';

            // actualizo datos sesion
            const guardarTurnosAnulacion = JSON.stringify(turnos);
            localStorage.setItem("TurnosAlmacenados", guardarTurnosAnulacion);
            location.reload();
            //Swal.fire('Saved!', '', 'success')
        }
    })
}

function buscar() {

    /*textoBusqueda = document.getElementById("TxtBus").value;
    let resultadosBusqueda = ``;
    if (!textoBusqueda) {
        resultadosBusqueda += `<div>
            <p>Ingrese DNI</p>
            </div>`;
        document.getElementById('resultados-busqueda').innerHTML = resultadosBusqueda;
    } else {
        const resultados = turnos.filter((el) => el.dni == textoBusqueda);
        if (resultados.length > 0) {
            resultados.forEach((auxbusqueda) => {
                medicoresultado = medicos[auxbusqueda.medico].nombre;
                resultadosBusqueda += `<div>
                <p>FECHA: ${auxbusqueda.fecha} HORA: ${auxbusqueda.hora} MEDICO: ${medicoresultado}</p>
                </div>`;
            });
            document.getElementById('resultados-busqueda').innerHTML = resultadosBusqueda;
        } else {
            resultadosBusqueda += `<div>
            <p>NO SE REGISTRARON RESULTADOS</p>
            </div>`;
            document.getElementById('resultados-busqueda').innerHTML = resultadosBusqueda;
        }

    }*/
}

function quitarPersonaTurno(idturno) {

    Swal.fire({
        title: 'Confirma Borrar Paciente del Turno?',
        icon: 'question',
        showCloseButton: true,
        confirmButtonText: 'Confirmar',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            // Borro Paciente y cambio estado a Pendiente
            const posicionTurno = turnos.findIndex(turnoaux => {
                return turnoaux.id == idturno;
            });
            turnos[posicionTurno].email = '';
            turnos[posicionTurno].paciente = '';
            turnos[posicionTurno].estado = 'P';

            // actualizo datos sesion
            const guardarTurnosBorraPac = JSON.stringify(turnos);
            localStorage.setItem("TurnosAlmacenados", guardarTurnosBorraPac);
            location.reload();

        }
    })
}

function borraragenda() {
    localStorage.removeItem('agendaCreada');
    localStorage.removeItem('TurnosAlmacenados')
    location.reload();
}

function crearComboMedico() {
    acumulador = ``;
    acumulador += `<option value=99>(Seleccione Medico)</option>`;
    medicos.forEach(medicoaux => {
        acumulador += `<option value=${medicoaux.ident}>${medicoaux.nombre}</option>`;
    })
    document.getElementById('combo-medico').innerHTML = acumulador;
}

function crearComboPacientes() {
    acumulador = ``;
    acumulador += `<option value=99>(Seleccione Paciente)</option>`;
    pacientes.forEach(pacienteaux => {
        acumulador += `<option value=${pacienteaux.id}>${pacienteaux.name}</option>`;
    })
    document.getElementById('combo-persona').innerHTML = acumulador;
}