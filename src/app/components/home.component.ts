import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent {
    public title:string;
    public values:string;
    public result:any;
    public wikidex_link:string;
    public object_keys:string[];

    constructor(
        protected pokemonService: PokemonService
    ) {}
    
    ngOnInit() {
        this.title = "Choose your pokemon"
        this.values = '';
        this.result = '';
        this.object_keys = [];
    }

    private getPokemon(id:string) {
        if (id === '') {
            alert('You must input something first');
        } else {
            let not_found_div = document.getElementById('not_found');
            this.pokemonService.getPokemon(id)
            .subscribe(
                data => {
                    this.result = data;
                    let pokemon_name = this.result.name;
                    this.wikidex_link = `https://www.wikidex.net/wiki/${pokemon_name}`;
                    
                    this.object_keys = Object.keys(this.result)
                    if (not_found_div.children.length > 0) {
                        not_found_div.style.display = 'none';
                    };
                },
                error => {
                    this.object_keys = [];
                    if (error.status === 404) {
                        if (not_found_div.children.length === 0) {
                            this.styleNotFound(not_found_div);
                        } else { // (not_found_div.children.length > 0)
                            not_found_div.style.display = 'flex';
                        };
                    };
                });
        }
    }

    onKey(event: any) { 
      this.values = event.target.value; 
    }

    //Start the pokemon search and reset input
    startSearch() {
        this.getPokemon(this.values);
        let input_search = <HTMLInputElement>document.getElementById('searchPokemon');
        input_search.value = '';
    }

    // Style image notFound and add it to not_found div
    private styleNotFound(not_found_div) {
        not_found_div.style.display = "flex";
                        
        let not_found_image = document.createElement('img');
        not_found_image.src = '../../assets/images/not_found.png';
        not_found_image.style.width = '80%';

        let not_found_p = document.createElement("p");
        not_found_p.textContent = "Pokemon not found";

        not_found_div.appendChild(not_found_image);
        not_found_div.appendChild(not_found_p);

        not_found_div.style.justifyContent = "center";
        not_found_div.style.flexWrap = "wrap";                        
                        
        not_found_div.className = "pokedex";       
        return not_found_div;
    }
}