import { Component, OnInit } from '@angular/core';
import { ModalPokemonService } from '../services/modal-pokemon.service';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading_pokemon: boolean = true;
  start: number = 0;
  limit: number = 20;
  total_user: number = 0;
  total_pagination: number = 0;

  page: number = 1;
  collection: any[] = [];

  constructor(private _pokedexService: PokedexService, private modalPokemonService: ModalPokemonService) { }

  ngOnInit(): void {


    this.loadUsers();

    this.total_pagination = this.total_user

  }



  loadUsers() {
    this.loading_pokemon = true;
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    this._pokedexService.getUsers({
      limit : this.limit,
      offset : this.start
    })
      .subscribe({
        next: (resp) =>{
          this.total_user = resp.total;
          resp.data.forEach(value => {


            if(value.pokemon1){

              this._pokedexService.getPokemonData(url + value.pokemon1)
              .subscribe({
                  next: (info) => {

                    value.pokemon_name1 = info.name
                  },
                  error: (e) => {
                    console.log(e);
                  }
              })

            }
            if(value.pokemon2){

              this._pokedexService.getPokemonData(url + value.pokemon2)
              .subscribe({
                  next: (info) => {
                    value.pokemon_name2 = info.name
                  },
                  error: (e) => {
                    console.log(e);
                  }
              })

            }
            if(value.pokemon3){

              this._pokedexService.getPokemonData(url + value.pokemon3)
              .subscribe({
                  next: (info) => {
                    value.pokemon_name3 = info.name
                  },
                  error: (e) => {
                    console.log(e);
                  }
              })

            }


          })
          this.users = resp.data;
          this.total_user = this.users.length;
          console.log(this.total_user);



        }
      });

  }

  showModal(user, pokemon: any[]) {
    this.modalPokemonService.abrirModalUser(user,pokemon);

  }

  pagination(valor: number){

    this.start += valor;
    this.limit = 5;
    if (this.start < 0){
      this.start = 0;
    }

  }

}
