import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HouseListItem } from '../../models/house';
import * as Actions from '../../state/houses/houses.actions';
import * as Selectors from '../../state/houses/houses.selectors';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit {
  houses$: Observable<HouseListItem[]> = this.store.select(Selectors.selectHousesList);
  loading$: Observable<boolean> = this.store.select(Selectors.selectHousesListLoading);
  error$: Observable<string | null> = this.store.select(Selectors.selectHousesListError);

  page = 1;
  pageSize = 20;

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(Actions.loadHouses({ page: this.page, pageSize: this.pageSize }));
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
}
