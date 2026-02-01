import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { CharacterDetails } from '../../models/character';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character: CharacterDetails | null = null;
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.api.getCharacterById(params.get('id') || '')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.character = data;
          this.loading = false;
        },
        error: () => {
          this.character = null;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
