import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  loading = false;

  private readonly destroy$ = new Subject<void>();

  private readonly minShowMs = 350;
  private shownAt = 0;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          e =>
            e instanceof NavigationStart ||
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(e => {
        if (e instanceof NavigationStart) {
          this.loading = true;
          this.shownAt = Date.now();
        } else {
          this.hideWithMinDuration();
        }
      });
  }

  private hideWithMinDuration(): void {
    if (!this.loading) return;

    const elapsed = Date.now() - this.shownAt;
    const remaining = this.minShowMs - elapsed;

    if (remaining > 0) {
      setTimeout(() => (this.loading = false), remaining);
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
