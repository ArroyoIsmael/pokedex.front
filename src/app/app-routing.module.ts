import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { UsersComponent } from './users/users.component';

// MODULOS
const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full'},
  { path: 'pokedex', component: PokemonComponent},
  { path: 'users', component: UsersComponent},
  { path: '**', component: PokemonComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
