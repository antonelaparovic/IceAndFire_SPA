import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { HouseDetails } from '../../models/house';
import * as Actions from '../../state/houses/houses.actions';
import * as Selectors from '../../state/houses/houses.selectors';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  houseId = '';

  house$!: Observable<HouseDetails | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(Selectors.selectHouseDetailsLoading);
    this.error$ = this.store.select(Selectors.selectHouseDetailsError);

    this.route.paramMap
      .pipe(
        map(p => p.get('id') || ''),
        takeUntil(this.destroy$)
      )
      .subscribe(id => {
        this.houseId = id;

        this.house$ = this.store.select(Selectors.selectHouseDetailsById(id));
        this.store.dispatch(Actions.loadHouseDetails({ id }));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
