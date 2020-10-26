let verde = document.getElementById('verde')
let rojo = document.getElementById('rojo')
let amarillo = document.getElementById('amarillo')
let celeste = document.getElementById('celeste')
let btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10

class Juego {
  constructor() {
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.inicializar = this.inicializar.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.colores = {
      verde,
      rojo,
      amarillo,
      celeste
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    }else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'verde'
      case 1:
        return 'rojo'
      case 2:
        return 'amarillo'
      case 3:
        return 'celeste'
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case 'verde':
        return 0
      case 'rojo':
        return 1
      case 'amarillo':
        return 2
      case 'celeste':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 450);
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }
  agregarEventosClick() {
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
    this.colores.amarillo.addEventListener('click', this.elegirColor)
  }
  eliminarEventosClick() {
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
    this.colores.amarillo.removeEventListener('click', this.elegirColor)
  }
  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          setTimeout(this.siguienteNivel, 1500)
        }
      }
    } else {
      this.perdioElJuego()
    }
  }
  ganoElJuego() {
    swal('Felicidades', 'ganaste el juego!', 'success')
      .then(this.inicializar)
  }
  perdioElJuego() {
    swal('Lo lamantamos', 'perdiste 😪', 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego() {
  let juego = new Juego()
}
