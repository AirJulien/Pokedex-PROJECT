import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { HttpService } from 'src/app/services/httpService/http.service';
import { forkJoin } from 'rxjs';
import { Stat } from 'src/app/models/stat';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.component.html',
  styleUrls: ['./list-pokemons.component.css']
})
export class ListPokemonsComponent implements OnInit {
  selectedPokemon : Pokemon = new Pokemon()
  listPokemons: Pokemon[] = []
  offSet: number = 20
  constructor(private httpService: HttpService, private dialog: MatDialog) { }

  ngOnInit() {
   
    this.getPokemons(0,20)
  }


  async getPokemons(min, number) {
    await this.httpService.getPokemonInRange(min, number).subscribe((pokemonUrls: any) => {
      const urlList: any[] = []
      pokemonUrls.results.forEach((pokemonData) => {
        urlList.push(this.httpService.getPokemonByUrl(pokemonData.url))
      })
      forkJoin(urlList).subscribe(responseList => {
        responseList.forEach((pokemonDatas) => {
          const tempPoke = new Pokemon();
          tempPoke.id = pokemonDatas.id
          tempPoke.name = pokemonDatas.name
          tempPoke.abilities = pokemonDatas.abilities.map((ability) => ability.ability.name)
          tempPoke.stats = pokemonDatas.stats.map((stat) => new Stat(stat.stat.name, stat.base_stat))
          tempPoke.images = [pokemonDatas.sprites.front_default, pokemonDatas.sprites.back_default]
          tempPoke.images = tempPoke.images.filter((image) => image != null)
          tempPoke.types = pokemonDatas.types.map((type) => type.type.name)
          this.httpService.getPokemonDescription(pokemonDatas.species.url).subscribe((pokemonSpecies: any) => {
            tempPoke.description = pokemonSpecies.flavor_text_entries.filter(flavorTextEntry => flavorTextEntry.language.name === "en")[0].flavor_text;
          })
          this.listPokemons.push(tempPoke)
        })
      });
    })
  }

  addPokemons(){
    this.getPokemons(this.offSet, this.offSet+20)
    this.offSet+=20;
  }
  
  openCardDetails(pokemon){
    this.selectedPokemon = pokemon
    this.openDialogPokemon()
  }

  openDialogPokemon() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      pokemon : this.selectedPokemon
  };
    this.dialog.open(PokemonDialogComponent, dialogConfig);
}

}
