import { Injectable } from '@angular/core';
import { PokedexService } from './pokedex.service';

@Injectable({
  providedIn: 'root'
})
export class ModalPokemonService {

  private _ocultarModal: boolean = true;

  name: string = '';
  numb: number;
  stats: any[] = [];
  img: any;
  is_user: boolean = false;

  pokemon: any[] =[];
  name_user: string = '';


  get ocultarModal() {

    return this._ocultarModal;

  }

  abrirModal(pokemon) {
    this._ocultarModal = false;

    this.name = pokemon.name;
    this.numb = pokemon.id;
    this.stats = pokemon.stats;
    this.img = pokemon.sprites.front_default;

  }

  abrirModalUser(user,pokemon_data: any[]){
    this.pokemon = [];
    this.is_user = true;
    this._ocultarModal = false;
    const url = `https://pokeapi.co/api/v2/pokemon/`;

    console.log(pokemon_data);

    this.name_user = user;

    pokemon_data.forEach(value => {
      this._pokedexService.getPokemonData(url + value)
              .subscribe({
                  next: (info) => {
                    this.pokemon.push(info);
                  },
                  error: (e) => {
                    console.log(e);
                  }
              })
    });

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor(private _pokedexService: PokedexService) { }
}
