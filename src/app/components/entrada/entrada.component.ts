import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss'],
})
export class EntradaComponent implements OnInit {
  @Output() quieroJugar = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  jugar() {
    console.log('jugar');
    this.quieroJugar.emit(true);
  }
}
