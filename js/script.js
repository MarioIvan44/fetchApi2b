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
                    <button onClick = "EliminarRegistro(${persona.id})">Eliminar</buttton>
                </td>
            </tr>
        `
    });
}

//Se llama a la función de ObtenerPersonas
ObtenerPersonas();

//Proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal");// para abrir
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir modal
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar Modal
});

//Agregar nuevo integrante desde el nuevo formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e =>{
    e.preventDefault(); //"e" representa el evento Submit - Evita que el formulario se envíe

    //Capturamos los valores del formulario 
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();

    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos");
        return; //Evita que el código se siga ejecutándose
    }

    //Llamar a la API para enviar el usuario
   const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre,apellido,edad,correo})
   }); 

   if(respuesta.ok){
    alert("El registro fue agregado correctamente");


    //Limpiar el formulario
    document.getElementById("frmAgregarIntegrante").reset();

    //Cerrar el formulario
    modal.close();

    ObtenerPersonas();
   }
   else{
        alert("Hubo un error al agregar");
   }
}); //Fin del formulario



//Para eliminar registros
async function EliminarRegistro(id) {
    if(confirm("¿Estás seguro que deseas eliminar este registro?")){
        await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
        ObtenerPersonas(); //Para obtner la lista actualizada (Refresca)
    }   
}