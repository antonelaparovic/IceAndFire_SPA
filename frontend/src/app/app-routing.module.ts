import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { CharactersListComponent } from './pages/characters-list/characters-list.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { HouseDetailComponent } from './pages/house-detail/house-detail.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [

  { path: '', component: LandingComponent },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'characters', component: CharactersListComponent, canActivate: [AuthGuard] },
      { path: 'characters/:id', component: CharacterDetailComponent, canActivate: [AuthGuard] },

      { path: 'books', component: BooksListComponent, canActivate: [AuthGuard] },
      { path: 'books/:id', component: BookDetailComponent, canActivate: [AuthGuard] },

      { path: 'houses', component: HousesListComponent, canActivate: [AuthGuard] },
      { path: 'houses/:id', component: HouseDetailComponent, canActivate: [AuthGuard] },

      { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
