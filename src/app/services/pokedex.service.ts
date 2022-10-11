import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {


  constructor(private router : Router, private http: HttpClient, private ngZone : NgZone) { }

  getPokemon() {

    const url = `https://pokeapi.co/api/v2/pokemon`;

    return this.http.get(url + '?limit=150')
    .pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  getPokemonData(url) {
    return this.http.get(url)
    .pipe(
      map((resp: any) => {
        return resp;
      })
    )
  }

  registerUser(formData){
    const url = `http://127.0.0.1:8000/api/user`;

    return this.http.post( url, formData)
      .pipe(
        map ( (resp: any) => {

          return resp;
        })
      );

  }

  registerPokemon(formData){
    const url = `http://127.0.0.1:8000/api/pokemon`;

    return this.http.post( url, formData)
      .pipe(
        map ( (resp: any) => {

          return resp;
        })
      );

  }

  getUsers(params:any){
    const url = `http://127.0.0.1:8000/api/user/pokemon`;

    return this.http.get( url)
      .pipe(
        map ( (resp: any) => {

          return resp;
        })
      );

  }

}
