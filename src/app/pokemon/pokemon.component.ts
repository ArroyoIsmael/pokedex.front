import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PokedexService } from 'src/app/services/pokedex.service';
import Swal from 'sweetalert2'
import { ModalPokemonService } from '../services/modal-pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']

})
export class PokemonComponent implements OnInit {

  formRegisterPokemon: FormGroup;
  pokemon: any[] = [];
  loading_pokemon: boolean = true;
  pokemon_select: any[] = [];
  is_all_select: boolean = false;

  constructor(private _pokedexService: PokedexService, private modalPokemonService: ModalPokemonService) { }

  ngOnInit(): void {

    this.formRegisterPokemon = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200),
      ])
    });

    this.loadPokemon();

  }

  loadPokemon() {
    this.loading_pokemon = true;

    this._pokedexService.getPokemon()
        .subscribe(data => {
          data.results.forEach(element => {
            this._pokedexService.getPokemonData(element.url)
            .subscribe(info => {
              this.pokemon.push(info);
              if (info.id == 150) {
                this.loading_pokemon = false;
              }
            })
          });

        })

  }

  selectPokemon(id_pokemon, item){

    let index_pokemon = this.pokemon_select.indexOf(id_pokemon);

    if (index_pokemon >= 0) {
      this.pokemon_select.splice(index_pokemon,1);

    } else {
      this.pokemon_select.push(id_pokemon);
    }
    console.log(this.pokemon_select);

  }

  disabledPokemon(id_pokemon){

    let index_pokemon = this.pokemon_select.indexOf(id_pokemon);
    if (index_pokemon < 0 && this.pokemon_select.length >= 6) {
      return true;
    }
    return false;

  }

  registerUser(){

    let form = this.formRegisterPokemon;

    if (this.formRegisterPokemon.invalid) {
      Swal.fire('Error', 'Favor de ingresar un nombre válido', 'warning');
      return;
    } else if(this.pokemon_select.length < 6 || this.pokemon_select.length >6)  {
      Swal.fire('Ups', 'Debes de seleccionar 6 pokemon', 'warning');
    } else {
      let params = {
        'name' : form.controls['name'].value,
        'pokemon': this.pokemon_select
      };
      this._pokedexService.registerUser(params)
        .subscribe({
          next: (resp) =>{
            if(resp.user) {
               //LLamada al servicio de registro
              Swal.fire('¡FELICIDADES!', 'Te has registrado con tus primeros 6 pokemon', 'success');
              form.controls['name'].setValue('');
              this.pokemon_select = [];
              this.loadPokemon();

            } else {
              Swal.fire('Ups', resp.msg, 'warning');
            }

          },
          error: (e) => {
            console.log(e);
            Swal.fire('Ups', 'Ocurrio un error', 'error');
          }
        })
    }



  }

  showModal(pokemon) {
    this.modalPokemonService.abrirModal(pokemon);

  }


}
