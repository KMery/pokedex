import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';

//Routes
import { routing, appRoutingProviders } from './app.routing';

//Components
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';

//Services
import { PokemonService } from '../app/services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing
  ],
  providers: [
    PokemonService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
