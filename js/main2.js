// Crear Turnos para dia de la fecha

class Turno {
    constructor(id, fecha, hora, paciente, dni, estado, claseboton, clasebotonP, clasebotonA, medico) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente;
        this.dni = dni;
        this.estado = estado;
        this.claseboton = claseboton;
        this.clasebotonP = clasebotonP;
        this.clasebotonA = clasebotonA;
        this.medico = medico;
    }
}

class Medico {
    constructor(ident, nombre, matricula) {
        this.ident = ident;
        this.nombre = nombre;
        this.matricula = matricula;
    }
}

const medicos = [];
medicos.push(new Medico(0, 'Burgos Angel', '8080'));
medicos.push(new Medico(1, 'Pulido Ruben', '8081'));
medicos.push(new Medico(2, 'Cruz Mario', '8082'));

const turnos = [];
let acumulador = ``;

let agendaCreada = localStorage.getItem('agendaCreada');

if (agendaCreada == 'S') {

    // crear titulos medicos

    document.getElementById('nombre-medico1').innerHTML = 'MEDICO: ' + medicos[0].nombre;
    document.getElementById('nombre-medico2').innerHTML = 'MEDICO: ' + medicos[1].nombre;
    document.getElementById('nombre-medico3').innerHTML = 'MEDICO: ' + medicos[2].nombre;

    // crear turnos obtenidos de sesion

    const turnosAlmacenadosSesion = localStorage.getItem("TurnosAlmacenados");
    const parseTurnos = JSON.parse(turnosAlmacenadosSesion);

    for (const objetoturno of parseTurnos)
        turnos.push(new Turno(objetoturno.id, objetoturno.fecha, objetoturno.hora, objetoturno.paciente, objetoturno.dni, objetoturno.estado, objetoturno.claseboton, objetoturno.clasebotonP, objetoturno.clasebotonA, objetoturno.medico));

    // medico 1
    acumulador = ``;
    turnos.forEach((turnoindividual) => {

        if (turnoindividual.id >= 0 && turnoindividual.id <= 5) {

            let estadoTurno = turnoindividual.estado;
            switch (estadoTurno) {

                case 'A':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosAnulado">${turnoindividual.hora} - ANULADO</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;

                case 'O':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosOcupado">${turnoindividual.hora} - PACIENTE: ${turnoindividual.dni} ${turnoindividual.paciente}</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonesQuitarPaciente" onclick="quitarPersonaTurno(${turnoindividual.id})">Borrar Paciente</button>
                </div>`;
                    break;

                case 'P':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${turnoindividual.id})">${turnoindividual.hora} - DISPONIBLE</button>
                <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${turnoindividual.id})">Anular</button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;
            }
        }

    });

    document.getElementById('turnos-medico1').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[0].ident);
    contarTurnosOtorgados(medicos[0].ident);

    // medico 2
    acumulador = ``;
    turnos.forEach((turnoindividual) => {

        if (turnoindividual.id >= 6 && turnoindividual.id <= 11) {

            estadoTurno = turnoindividual.estado;
            switch (estadoTurno) {

                case 'A':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosAnulado">${turnoindividual.hora} - ANULADO</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;

                case 'O':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosOcupado">${turnoindividual.hora} - PACIENTE: ${turnoindividual.dni} ${turnoindividual.paciente}</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonesQuitarPaciente" onclick="quitarPersonaTurno(${turnoindividual.id})">Borrar Paciente</button>
                </div>`;
                    break;

                case 'P':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${turnoindividual.id})">${turnoindividual.hora} - DISPONIBLE</button>
                <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${turnoindividual.id})">Anular</button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;
            }
        }

    });

    document.getElementById('turnos-medico2').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[1].ident);
    contarTurnosOtorgados(medicos[1].ident);

    // medico 3
    acumulador = ``;
    turnos.forEach((turnoindividual) => {

        if (turnoindividual.id >= 12 && turnoindividual.id <= 17) {

            estadoTurno = turnoindividual.estado;
            switch (estadoTurno) {

                case 'A':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosAnulado">${turnoindividual.hora} - ANULADO</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;

                case 'O':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnosOcupado">${turnoindividual.hora} - PACIENTE: ${turnoindividual.dni} ${turnoindividual.paciente}</button>
                <button id="anular-turno" class="botonOculto"></button>
                <button id="borrar-paciente" class="botonesQuitarPaciente" onclick="quitarPersonaTurno(${turnoindividual.id})">Borrar Paciente</button>
                </div>`;
                    break;

                case 'P':
                    acumulador += `<div class="alineacionCentro espacioInferior">
                <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${turnoindividual.id})">${turnoindividual.hora} - DISPONIBLE</button>
                <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${turnoindividual.id})">Anular</button>
                <button id="borrar-paciente" class="botonOculto"></button>
                </div>`;
                    break;
            }
        }

    });

    document.getElementById('turnos-medico3').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[2].ident);
    contarTurnosOtorgados(medicos[2].ident);

    document.getElementById('crear-agenda').style.display = 'none';

}

//mostrarPacientes()

function crearturnos() {


    let horaInicial = 8;
    let horaInicialtxt = '';

    for (let indice = 0; indice <= 5; indice++) {

        medicoTurno = medicos[0].ident;
        horaInicial = horaInicial + 1;
        horaInicialtxt = horaInicial.toString();
        horaInicialtxt = horaInicialtxt.padStart(2, '0') + ':00';
        boton = "btn" + indice.toString();
        botonP = "btnP" + indice.toString();
        botonA = "btnA" + indice.toString();
        turnos.push(new Turno(indice, fechaHoy(), horaInicialtxt, '', '', 'P', boton, botonP, botonA, medicoTurno));
    }

    horaInicial = 8;
    for (let indice = 6; indice <= 11; indice++) {

        medicoTurno2 = medicos[1].ident;
        horaInicial = horaInicial + 1;
        horaInicialtxt = horaInicial.toString();
        horaInicialtxt = horaInicialtxt.padStart(2, '0') + ':00';
        boton = "btn" + indice.toString();
        botonP = "btnP" + indice.toString();
        botonA = "btnA" + indice.toString();
        turnos.push(new Turno(indice, fechaHoy(), horaInicialtxt, '', '', 'P', boton, botonP, botonA, medicoTurno2));
    }

    horaInicial = 8;
    for (let indice = 12; indice <= 17; indice++) {

        medicoTurno3 = medicos[2].ident;
        horaInicial = horaInicial + 1;
        horaInicialtxt = horaInicial.toString();
        horaInicialtxt = horaInicialtxt.padStart(2, '0') + ':00';
        boton = "btn" + indice.toString();
        botonP = "btnP" + indice.toString();
        botonA = "btnA" + indice.toString();
        turnos.push(new Turno(indice, fechaHoy(), horaInicialtxt, '', '', 'P', boton, botonP, botonA, medicoTurno3));
    }

    // botones Medico 1

    turnos.forEach((auxturno) => {

        if (auxturno.id >= 0 && auxturno.id <= 5) {
            acumulador += `<div class="alineacionCentro espacioInferior">
        <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${auxturno.id})">${auxturno.hora} - DISPONIBLE</button>
        <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${auxturno.id})">Anular</button>
        <button id="borrar-paciente" class="botonOculto"></button>
        </div>`;
        }

    });

    document.getElementById('turnos-medico1').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[0].ident);
    contarTurnosOtorgados(medicos[0].ident);

    // botones medico 2
    acumulador = ``;

    turnos.forEach((auxturno) => {

        if (auxturno.id >= 6 && auxturno.id <= 11) {
            acumulador += `<div class="alineacionCentro espacioInferior">
        <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${auxturno.id})">${auxturno.hora} - DISPONIBLE</button>
        <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${auxturno.id})">Anular</button>
        <button id="borrar-paciente" class="botonOculto"></button>
        </div>`;
        }

    });

    document.getElementById('turnos-medico2').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[1].ident);
    contarTurnosOtorgados(medicos[1].ident);

    // botones medico 3
    acumulador = ``;

    turnos.forEach((auxturno) => {

        if (auxturno.id >= 12 && auxturno.id <= 17) {
            acumulador += `<div class="alineacionCentro espacioInferior">
        <button id="asignar-turno" class="botonesTurnos" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="solicitarDatos(${auxturno.id})">${auxturno.hora} - DISPONIBLE</button>
        <button id="anular-turno" class="botonesAnularTurnos" onclick="anularTurno(${auxturno.id})">Anular</button>
        <button id="borrar-paciente" class="botonOculto"></button>
        </div>`;
        }

    });

    document.getElementById('turnos-medico3').innerHTML = acumulador;
    contarTurnosDisponibles(medicos[2].ident);
    contarTurnosOtorgados(medicos[2].ident);

    // crear titulos medicos

    document.getElementById('nombre-medico1').innerHTML = 'MEDICO: ' + medicos[0].nombre;
    document.getElementById('nombre-medico2').innerHTML = 'MEDICO: ' + medicos[1].nombre;
    document.getElementById('nombre-medico3').innerHTML = 'MEDICO: ' + medicos[2].nombre;

    // guardar en sesion los turnos creados


    document.getElementById('crear-agenda').style.display = 'none';
    localStorage.setItem('agendaCreada', 'S');
    const guardarTurnosSesion = JSON.stringify(turnos);
    localStorage.setItem("TurnosAlmacenados", guardarTurnosSesion);
}


// funciones

function solicitarDatos(turnosesion) {
    localStorage.setItem('TurnoId', turnosesion);// guardar en sesion
}

function confirmarDatos() {

    let idturno = localStorage.getItem('TurnoId'); // Recupero de sesion
    let documento = document.getElementById("recipiente-doc").value;
    let nombreApellido = document.getElementById("recipiente-nombre").value;

    if (documento != "" && nombreApellido != "") {

        let medicoopcion = turnos[idturno].medico;

        // Asigno los datos ingresados en el turno seleccionado y cambio estado de turno a Ocupado
        turnos[idturno].dni = documento;
        turnos[idturno].paciente = nombreApellido;
        turnos[idturno].estado = 'O';

        // actualizo datos sesion
        const guardarTurnosConfirmacion = JSON.stringify(turnos);
        localStorage.setItem("TurnosAlmacenados", guardarTurnosConfirmacion);

        limpiarVariables();
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
            turnos[idturno].dni = '';
            turnos[idturno].paciente = '';
            turnos[idturno].estado = 'A';

            // actualizo datos sesion
            const guardarTurnosAnulacion = JSON.stringify(turnos);
            localStorage.setItem("TurnosAlmacenados", guardarTurnosAnulacion);
            location.reload();
            //Swal.fire('Saved!', '', 'success')
        }
    })
}

function buscar() {

    textoBusqueda = document.getElementById("TxtBus").value;
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

    }
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
            turnos[idturno].dni = '';
            turnos[idturno].paciente = '';
            turnos[idturno].estado = 'P';

            // actualizo datos sesion
            const guardarTurnosBorraPac = JSON.stringify(turnos);
            localStorage.setItem("TurnosAlmacenados", guardarTurnosBorraPac);
            location.reload();

        }
    })
}

function limpiarVariables() {
    document.getElementById("recipiente-doc").value = '';
    document.getElementById("recipiente-nombre").value = '';
}

function borraragenda() {
    localStorage.removeItem('agendaCreada');
    location.reload();
}

