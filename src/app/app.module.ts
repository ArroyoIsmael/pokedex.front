import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { UsersComponent } from './users/users.component';
import { ModalPokemonComponent } from './modal/modal-pokemon/modal-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    UsersComponent,
    ModalPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    ModalPokemonComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
