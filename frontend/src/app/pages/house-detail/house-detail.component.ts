import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { HouseDetails } from '../../models/house';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.scss'],
})
export class HouseDetailComponent implements OnInit, OnDestroy {
  house: HouseDetails | null = null;
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.api.getHouseById(params.get('id') || '')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.house = data;
          this.loading = false;
        },
        error: () => {
          this.house = null;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
