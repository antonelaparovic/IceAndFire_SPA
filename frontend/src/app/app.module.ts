import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './layout/shell/shell.component';
import { HeaderComponent } from './layout/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { HouseDetailComponent } from './pages/house-detail/house-detail.component';
import { KeyValueViewComponent } from './shared/key-value-view/key-value-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderComponent,
    LandingComponent,
    CharactersListComponent,
    BooksListComponent,
    HousesListComponent,
    FavoritesComponent,
    CharacterDetailComponent,
    BookDetailComponent,
    HouseDetailComponent,
    KeyValueViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
