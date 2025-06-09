export default class Paginas {
  #id;
  #pagina;
  #fechaInicio;
  #fechaTerminar;
  #estado;
  #prioridad;
  constructor(pagina, fechaInicio, fechaTerminar, estado, prioridad) {
    this.#id = crypto.randomUUID();
    this.#pagina = pagina;
    this.#fechaInicio = fechaInicio;
    this.#fechaTerminar = fechaTerminar;
    this.#estado = estado;
    this.#prioridad = prioridad;
  }

  get pagina() {
    return this.#pagina;
  }

  get fechaInicio() {
    return this.#fechaInicio;
  }

  get fechaTerminar() {
    return this.#fechaTerminar;
  }

  get estado() {
    return this.#estado;
  }
  get prioridad() {
    return this.#prioridad;
  }
  get id() {
    return this.#id;
  }

  set pagina(nuevaPagina) {
    this.#pagina = nuevaPagina;
  }

  set fechaInicio(nuevaFechaInicio) {
    this.#fechaInicio = nuevaFechaInicio;
  }

  set fechaTerminar(nuevaFechaTerminar) {
    this.#fechaTerminar = nuevaFechaTerminar;
  }

  set estado(nuevoEstado) {
    this.#estado = nuevoEstado;
  }
  set prioridad(nuevaPrioridad) {
    this.#prioridad = nuevaPrioridad;
  }

  toJSON() {
    return {
      id: this.#id,
      pagina: this.#pagina,
      fechaInicio: this.#fechaInicio,
      fechaTerminar: this.#fechaTerminar,
      estado: this.#estado,
      prioridad: this.#prioridad,
    };
  }
}
