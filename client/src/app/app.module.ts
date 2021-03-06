import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PreviewInfosComponent } from './components/preview-infos/preview-infos.component';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/httpService/http.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PokemonService } from './services/pokemonService/pokemon.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/search/search.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CreatePokemonComponent } from './components/create-pokemon/create-pokemon.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PokemonDialogComponent } from './components/pokemon-dialog/pokemon-dialog.component';

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PreviewInfosComponent,
    SearchPokemonComponent,
    SidebarComponent,
    SearchComponent,
    CreatePokemonComponent,
    PreviewCardComponent,
    ListPokemonsComponent,
    PokemonDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
],
  providers: [HttpService,PokemonService],
  bootstrap: [AppComponent],
  entryComponents:[PokemonDialogComponent]
})
export class AppModule { }
