import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mayorMenor',
  templateUrl: './mayorMenor.component.html',
  styleUrls: ['./mayorMenor.component.scss'],
})
export class MayorMenorComponent {
  @Output() gano = new EventEmitter();
  title = 'mayor-menor';
  readonly cards = ['♥', '♣', '♦', '♠'];
  readonly numbers = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  readonly vidas = [true, true, true];
  numeroAComparar = '';
  numeroCartaAnterior = '';
  singleNumero = '';
  aparece = false;
  cartaEstatica = false;
  corazones = 3;
  flag = false;
  disableBtn = true;
  texto = 'Espectacular Terminaste con las 3 vidas intactas ,sos un crack!';
  adivinadas = 0;
  cantidad = 10;
  constructor(private toastr: ToastrService) {
    this.inicialiarJuego();
  }
  reproducir() {
    const audio = new Audio('../../../assets/sonidos/carta.mp3');
    audio.play();
  }
  inicialiarJuego() {
    this.corazones = 3;
    this.numeroCartaAnterior = '';
    this.generadorcarta();
    this.numeroCartaAnterior = this.numeroAComparar;
    this.cartaEstaticae();
    setTimeout(() => {
      (this.aparece = true), 1000;
    });
    this.disableBtn = true;
    this.cantidad = 10;
    this.adivinadas = 0;
    this.descontarCorazones();
  }

  generadorcarta(): string {
    let singleCard = this.cards[Math.floor(Math.random() * 4)];
    this.singleNumero =
      this.numbers[Math.floor(Math.random() * this.numbers.length)];
    this.numeroAComparar = this.singleNumero + '' + singleCard;
    return this.singleNumero;
  }

  buscadorDeItem(carta: string): number {
    let numero = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      if (carta === this.numbers[i]) {
        numero = i + 1;
      }
    }
    return numero;
  }

  descontarCorazones() {
    if (this.corazones === 3) {
      this.vidas[0] = true;
      this.vidas[1] = true;
      this.vidas[2] = true;
    } else {
      if (this.corazones === 2) {
        this.texto =
          'Genial te felicito terminaste con 2 vidas a que no terminas sin usar ninguna , te reto!!!';
        this.vidas[0] = false;
      } else {
        if (this.corazones === 1) {
          this.texto =
            'uuuhh perro ahi nomas eh , pero terminaste con una sola pero genial!! cuanto q no te jugas otra ?';
          this.vidas[1] = false;
        } else {
          this.vidas[2] = false;
        }
      }
    }
  }

  perderVidas() {
    this.corazones--;
    this.descontarCorazones();
    if (this.corazones === 0) {
      //perdio,
      this.mensajePerdiste();
      this.disableBtn = false;
    }
  }
  compararCarta(cartaAntes: number, cartaDespues: number, flag: boolean) {
    if (flag) {
      if (cartaAntes > cartaDespues) {
        this.perdiste();
        this.perderVidas();
        //descuento de corazones
      } else {
        this.ganaste();
        this.adivinadas++;
      }
    } else {
      if (cartaAntes > cartaDespues) {
        this.ganaste();
        this.adivinadas++;
      } else {
        this.perdiste();
        this.perderVidas();
        //descuento de corazones
      }
    }

    this.cantidad--;
    setTimeout(() => {
      (this.disableBtn = true), 5000;
    });
    setTimeout(() => {
      (this.aparece = true), 1000;
    });
    setTimeout(() => {
      (this.flag = false), 1000;
    });
    this.numeroCartaAnterior = this.numeroAComparar;
  }

  DarVueltaCarta() {
    this.flag = true;
    this.aparece = false;
    this.disableBtn = false;
  }
  ProcesoDelJuego(flagMayorOMenor: boolean) {
    if (this.cantidad !== 0 && this.corazones !== 0) {
      let numeroAnterior = this.buscadorDeItem(this.singleNumero);
      let CartaSiguente = this.buscadorDeItem(this.generadorcarta());
      this.DarVueltaCarta();
      setTimeout(() => {
        this.compararCarta(numeroAnterior, CartaSiguente, flagMayorOMenor);
      }, 1500);
      setTimeout(() => {
        this.cartaEstaticae();
      }, 80000);
      if (this.cantidad === 0 && this.corazones != 0) {
        this.mensajevictoria(this.texto);
      }
    } else {
      if (this.cantidad === 0 && this.corazones != 0) {
        this.mensajevictoria(this.texto);
      }
      this.disableBtn = false;
    }
  }
  cartaEstaticae() {
    this.cartaEstatica = true;
  }
  mayor() {
    this.ProcesoDelJuego(true);
    this.reproducir();
  }
  menor() {
    this.ProcesoDelJuego(false);
    this.reproducir();
  }

  ganaste() {
    this.toastr.success('Adivinaste!!', 'CARTA', {
      positionClass: 'right',
      timeOut: 500,
    });
  }
  perdiste() {
    this.toastr.error('Uhh le erraste y perdiste una vida', 'CARTA', {
      positionClass: 'right',
      timeOut: 500,
    });
  }
  mensajevictoria(text: string) {
    Swal.fire({
      //icon: 'success',
      title: 'Ganaste, aguante el vino prófugo',
      text: text,
      imageUrl: '../../../assets/imagenes/menor-mayor/victoria.jpeg',
      imageHeight: 300,
      confirmButtonText: '¿Jugar otra partida? ',
      showDenyButton: true,
      denyButtonText: 'Seguir con las pistas ? ',
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
        this.inicialiarJuego();
      } else if (result.isDenied) {
        this.gano.emit(true);
      }
    });
  }
  mensajePerdiste() {
    let texto = 'Poprquie no sale lo q quiero';
    Swal.fire({
      //icon: 'success',
      title: 'Perdiste Pichona',

      text:
        'Ha perdido esta vez, pero lo hizo excelente con ' +
        this.adivinadas +
        ' cartas adivinadas de 10',
      imageUrl: '../../../assets/imagenes/menor-mayor/derrota.jpg',
      imageHeight: 300,
      imageAlt: 'A tall image',
      confirmButtonText: '¿Jugar otra partida? ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inicialiarJuego();
      }
    });
  }
}
