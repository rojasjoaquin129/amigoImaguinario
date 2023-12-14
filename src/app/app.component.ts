import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'juego del amigo desconocido';
  public mostrarSaludo = true;
  public mostrarAhorcado = false;
  public mostrarMayormenor = false;
  public mostrarOrdenamiento = false;
  quiereJugar() {
    this.mostrarSaludo = false;
    this.mostrarMayormenor = true;
    this.mostrarAhorcado = false;
    this.mostrarOrdenamiento = false;
  }

  ganoMayoroMenor() {
    this.mostrarMayormenor = false;
    this.mostrarSaludo = false;
    this.mostrarAhorcado = true;
    this.mostrarOrdenamiento = false;
  }
  ganoHorcado() {
    this.mostrarMayormenor = false;
    this.mostrarSaludo = false;
    this.mostrarAhorcado = false;
    this.mostrarOrdenamiento = true;
  }
}
