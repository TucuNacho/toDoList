import Paginas from "./classeTarea.js";

//funciones
const abrirModal = () => {
  const modalElement = document.getElementById("modalWeb"); // o el ID que tengas
  const modalWeb = new bootstrap.Modal(modalElement);
  modalWeb.show();
};
const crearWeb = () => {
  const lista = new Paginas(
    inputWeb.value,
    inputFechaInicio.value,
    inputFechaTermino.value,
    inputEstado.value,
    inputPrioridad.value
  );
  toDoList.push(lista);
  // guardar en localStorage
  guardarLocalStorage();
  // dibujar la fila en la tabla
  dibujarFila(lista, toDoList.length);
  resetForm();
};

const resetForm = () => {
  formWeb.reset();
};

const guardarLocalStorage = () => {
  localStorage.setItem("toDoListKey", JSON.stringify(toDoList));
};

const cargarWeb = () => {
  if (toDoList > 0) {
    toDoList.map((web, indice) => dibujarFila(web, indice + 1));
  }
};

const dibujarFila = (web, indice) => {
  tablaWeb.innerHTML += `<tr>
              <th scope="row">${indice}</th>
              <td>${web.pagina}</td>
              <td>${web.fechaInicio}</td>
              <td>${web.fechaTerminar}</td>
              <td>${web.estado}</td>
              <td>${web.prioridad}</td>
              <td>
                <button class="btn btn-warning"onclick="prepararContacto('${web.id}')" >Editar</button>
                <button class="btn btn-danger" onclick="eliminarContacto('${web.id}')" >Borrar</button>
                <button class="btn btn-info" onclick="verContacto('${web.id}')">Ver</button>
              </td>
            </tr>`;
};
// Variables
const BtnAgregar = document.getElementById("btnAgregar");
const formWeb = document.querySelector("form");
const inputWeb = document.getElementById("web");
const inputFechaInicio = document.getElementById("fechaI");
const inputFechaTermino = document.getElementById("fechaF");
const inputEstado = document.getElementById("estado");
const inputPrioridad = document.getElementById("prioridad");
const tablaWeb = document.querySelector("tbody");
const toDoList = [];

// Eventos
BtnAgregar.addEventListener("click", abrirModal);
formWeb.addEventListener("submit", (e) => {
  e.preventDefault();
  crearWeb();
  console.log("Formulario enviado");
});
//aqui abro la ventana modal
//cambie la variabl para que cree peliculas;
cargarWeb();
