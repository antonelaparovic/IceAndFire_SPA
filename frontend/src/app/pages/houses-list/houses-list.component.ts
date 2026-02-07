import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Observable, startWith, take } from 'rxjs';

import { HouseListItem } from '../../models/house';
import * as Actions from '../../state/houses/houses.actions';
import * as Selectors from '../../state/houses/houses.selectors';
import * as FavActions from '../../state/favourites/favourites.actions';
import * as FavSelectors from '../../state/favourites/favourites.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit {
  houses$ = this.store.select(Selectors.selectFilteredHousesList);
  loading$ = this.store.select(Selectors.selectHousesListLoading);

  search = new FormControl<string>('', { nonNullable: true });

  error$: Observable<string | null> = this.store.select(Selectors.selectHousesListError);

  page = 1;
  pageSize = 20;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadHouses({ page: this.page, pageSize: this.pageSize }));

    this.search.valueChanges
      .pipe(
        startWith(this.search.value),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.store.dispatch(Actions.setHousesQuery({ query: value }));
      });
  }


  nextPage(): void {
    this.page++;
    this.store.dispatch(Actions.loadHouses({ page: this.page, pageSize: this.pageSize }));
  }

  prevPage(): void {
    if (this.page === 1) return;
    this.page--;
    this.store.dispatch(Actions.loadHouses({ page: this.page, pageSize: this.pageSize }));
  }

  isFav$(id: string) {
    return this.store.select(FavSelectors.selectIsFavouriteHouse(id));
  }

  toggleFav(id: string): void {
    this.isFav$(id).pipe(take(1)).subscribe(isFav => {
      this.store.dispatch(
        isFav
          ? FavActions.removeFavouriteHouse({ id })
          : FavActions.addFavouriteHouse({ id })
      );
    });
  }
}
