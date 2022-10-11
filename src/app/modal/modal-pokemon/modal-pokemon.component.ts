import { Component, OnInit } from '@angular/core';
import { ModalPokemonService } from 'src/app/services/modal-pokemon.service';

@Component({
  selector: 'app-modal-pokemon',
  templateUrl: './modal-pokemon.component.html',
  styleUrls: ['./modal-pokemon.component.css']
})
export class ModalPokemonComponent implements OnInit {


  constructor(public modalPokemonService: ModalPokemonService) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.modalPokemonService.cerrarModal();
  }


}
