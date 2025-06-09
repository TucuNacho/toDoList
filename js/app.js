import Paginas from "./crearWeb.js";

//funciones
const abrirModal = () => {
  modalWeb.show();
  creandoWeb = true;
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
  if (toDoList.length !== 0) {
    toDoList.map((web, indice) => dibujarFila(web, indice + 1));
  }
};

const dibujarFila = (web, indice) => {
  console.log(web);

  tablaWeb.innerHTML += `<tr>
              <th scope="row">${indice}</th>
              <td>${web.pagina}</td>
              <td>${web.fechaInicio}</td>
              <td>${web.fechaTerminar}</td>
              <td>${web.estado}</td>
              <td>${web.prioridad}</td>
              <td>
                <button class="btn btn-warning"onclick="prepararPagina('${web.id}')" >Editar</button>
                <button class="btn btn-danger" onclick="eliminarPagina('${web.id}')" >Borrar</button>
                <button class="btn btn-info" onclick="verPagina('${web.id}')">Ver</button>
              </td>
            </tr>`;
};

window.eliminarPagina = (id) => {
  Swal.fire({
    title: "Estás seguro?",
    text: "No podras revertir esta accion!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#78c2ad",
    cancelButtonColor: "#ff7851",
    confirmButtonText: "Si,Borrar",
    cancelButtonText: "No,Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionWebEncontrada = toDoList.findIndex(
        (pagina) => pagina.id === id
      );
      toDoList.splice(posicionWebEncontrada, 1);
      guardarLocalStorage();
      tablaWeb.children[posicionWebEncontrada].remove();
      //actualizar los índices de las filas restan
    }
  });
};

window.prepararPagina = (id) => {
  const webEncontrada = toDoList.find((pagina) => pagina.id === id);
  inputWeb.value = webEncontrada.pagina;
  inputFechaInicio.value = webEncontrada.fechaInicio;
  inputFechaTermino.value = webEncontrada.fechaTerminar;
  inputEstado.value = webEncontrada.estado;
  inputPrioridad.value = webEncontrada.prioridad;
  abrirModal();
  idCrearWeb = id;
  creandoWeb = false;
};

const editarWeb = () => {
  const posicionWebEncontrada = toDoList.findIndex(
    (pagina) => pagina.id === idCrearWeb
  );
  toDoList[posicionWebEncontrada].pagina = inputWeb.value;
  toDoList[posicionWebEncontrada].fechaInicio = inputFechaInicio.value;
  toDoList[posicionWebEncontrada].fechaTerminar = inputFechaTermino.value;
  toDoList[posicionWebEncontrada].estado = inputEstado.value;
  toDoList[posicionWebEncontrada].prioridad = inputPrioridad.value;

  // Aqui actualizo el localStorage
  guardarLocalStorage();

  // Aqui limpio el formulario
  resetForm();
  // Aqui cierro el modal
  modalWeb.hide();

  // Actualizo la tabla
  const filaEditada = tablaWeb.children[posicionWebEncontrada];
  if (filaEditada) {
    filaEditada.children[1].textContent =
      toDoList[posicionWebEncontrada].pagina;
    filaEditada.children[2].textContent =
      toDoList[posicionWebEncontrada].fechaInicio;
    filaEditada.children[3].textContent =
      toDoList[posicionWebEncontrada].fechaTerminar;
    filaEditada.children[4].textContent =
      toDoList[posicionWebEncontrada].estado;
    filaEditada.children[5].textContent =
      toDoList[posicionWebEncontrada].prioridad;
  }
  Swal.fire({
    title: "Lista modificada",
    text: `${toDoList[posicionWebEncontrada].pagina} fue modificada correctamente`,
    icon: "success",
  });
};

// Variables
const modalWeb = new bootstrap.Modal(document.getElementById("modalWeb"));
const BtnAgregar = document.getElementById("btnAgregar");
const formWeb = document.querySelector("form");
const inputWeb = document.getElementById("web");
const inputFechaInicio = document.getElementById("fechaI");
const inputFechaTermino = document.getElementById("fechaF");
const inputEstado = document.getElementById("estado");
const inputPrioridad = document.getElementById("prioridad");
const tablaWeb = document.querySelector("tbody");
const toDoList = JSON.parse(localStorage.getItem("toDoListKey")) || [];
let idCrearWeb = null;
let creandoWeb = true;
// Eventos
BtnAgregar.addEventListener("click", abrirModal);
formWeb.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoWeb) {
    crearWeb();
  } else {
    editarWeb();
  }
  console.log("Formulario enviado");
});
//aqui abro la ventana modal
//cambie la variabl para que cree peliculas;
cargarWeb();
