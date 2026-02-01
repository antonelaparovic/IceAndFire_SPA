import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { BookDetails } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book: BookDetails | null = null;
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute, private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => this.api.getBookById(params.get('id') || '')),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
        },
        error: () => {
          this.book = null;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
