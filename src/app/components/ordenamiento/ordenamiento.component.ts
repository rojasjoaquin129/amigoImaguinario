import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ordenamiento',
  templateUrl: './ordenamiento.component.html',
  styleUrls: ['./ordenamiento.component.scss'],
})
export class OrdenamientoComponent implements OnInit {
  @Output() volver = new EventEmitter();
  cajas: Array<{ numero: string; estado: string }> = [];
  numerosGenerados: any;
  pocicionDelHueco = 0;
  movimientos = 0;
  constructor() {
    this.inicializarjuego();
  }

  inicializarjuego() {
    this.cajas = [];
    this.iniciarnumeros();
    this.movimientos = 0;
  }
  iniciarnumeros() {
    this.numerosGenerados = this.ordenar();
    for (let i = 0; i < this.numerosGenerados.length; i++) {
      if (this.numerosGenerados[i] === '16') {
        this.pocicionDelHueco = i;
        this.cajas.push({ numero: ' ', estado: 'cajas2' });
      } else {
        this.cajas.push({ numero: this.numerosGenerados[i], estado: 'cajas' });
      }
    }
  }

  verifiacion(cero: number, pociTocado: number) {
    let flag = false;
    if (cero == 3 || cero == 7 || cero == 11) {
      if (
        cero - 4 === pociTocado ||
        cero + 4 === pociTocado ||
        cero - 1 === pociTocado
      ) {
        flag = true;
      }
    } else if (cero == 4 || cero == 8 || cero == 12) {
      if (
        cero - 4 === pociTocado ||
        cero + 4 === pociTocado ||
        cero + 1 === pociTocado
      ) {
        flag = true;
      }
    } else if (
      cero + 1 === pociTocado ||
      cero + 4 === pociTocado ||
      cero - 4 === pociTocado ||
      cero - 1 === pociTocado
    ) {
      flag = true;
    }

    return flag;
  }

  buscarPocicionActual(numero: string) {
    let pocision = 0;
    for (let i = 0; i < this.cajas.length; i++) {
      if (numero == this.cajas[i].numero) {
        pocision = i;
      }
    }
    return pocision;
  }
  ngOnInit(): void {}

  ordenar() {
    const myArray = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
    ];

    let i, j, k;
    for (i = myArray.length; i; i--) {
      j = Math.floor(Math.random() * i);
      k = myArray[i - 1];
      myArray[i - 1] = myArray[j];
      myArray[j] = k;
    }
    return myArray;
  }
  verificarTabla() {
    let todo = 0;
    let flag = false;
    const myArray = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '15',
      '14',
      '13',
      ' ',
    ];
    for (let i = 0; i < this.cajas.length; i++) {
      if (myArray[i] === this.cajas[i].numero) {
        todo++;
      }
    }
    if (todo === 16) {
      flag = true;
    }
    return flag;
  }

  tocoCaja(caja: { numero: string; estado: string }): void {
    let pocicionTocado = this.buscarPocicionActual(caja.numero);
    let veri = this.verifiacion(this.pocicionDelHueco, pocicionTocado);
    if (veri) {
      let intercambio;
      intercambio = this.cajas[pocicionTocado];
      this.cajas[pocicionTocado] = this.cajas[this.pocicionDelHueco];
      this.cajas[this.pocicionDelHueco] = intercambio;

      this.pocicionDelHueco = pocicionTocado;
      this.movimientos++;
    }
    if (this.verificarTabla()) {
      this.mensajevictoria(
        'ganaste movimientos realizados ' + this.movimientos
      );
    }
  }
  mensajevictoria(texto: string) {
    Swal.fire({
      //icon: 'success',
      title: 'Felicidades!!! ganaste!!',
      text: 'Completaste el desafío sin morir, te felicito. Está es la última ubicación que vas a necesitar: -34.57883, -58.37311 ',
      imageUrl: '../../../assets/imagenes/menor-mayor/ganastetodo.jpeg',
      imageHeight: 300,
      confirmButtonText: 'empezar de nuevo?',
      padding: '3em',
      background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
      backdrop: `
       rgba(0,0,123,0.4)
       url("https://sweetalert2.github.io/images/nyan-cat.gif")
       left top
       no-repeat
     `,
    }).then((result) => {
      if (result.isConfirmed) {
        this.volver.emit(true);
      }
    });
  }
}
