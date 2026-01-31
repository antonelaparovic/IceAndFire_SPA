import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'characters', component: CharactersListComponent },
      { path: 'books', component: BooksListComponent },
      { path: 'houses', component: HousesListComponent },
      { path: 'favorites', component: FavoritesComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
