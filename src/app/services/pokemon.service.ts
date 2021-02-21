import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    public pokemonUrl;

    constructor(
        protected http: HttpClient
    ) {
        this.pokemonUrl = 'https://pokeapi.co/api/v2/pokemon-form/';
    }

    getPokemon(id:string) {
        let id_pokemon = id.toLocaleLowerCase();
        try {
            return this.http.get(this.pokemonUrl + id_pokemon);
        } catch (error) {
            console.error(error.message);
        }
    }
}