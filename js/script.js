//URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/lp8lgH/expo";

//Función para llamar a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuestas del servidor
    const res = await fetch(API_URL); //Obtener datos de la API (fetch = ir por o buscar)

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json(); //Esto es un JSON

    CrearTabla(data); //Enviamos el JSON a la función "CrearTabla"
}

//Función que creará las filas de la tabla a base a los registros que vienen de la API
function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API
    
    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Variamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</buttton>
                </td>
            </tr>
        `
    });
}

//Se llama a la función de ObtenerPersonas
ObtenerPersonas();