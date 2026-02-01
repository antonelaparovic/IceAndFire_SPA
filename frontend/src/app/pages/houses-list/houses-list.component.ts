import { Component, OnInit } from '@angular/core';
import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { HouseListItem } from '../../models/house';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit {
  houses: HouseListItem[] = [];
  loading = true;

  page = 1;
  pageSize = 20;

  constructor(private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.api.getHouses(this.page, this.pageSize).subscribe({
      next: (items) => {
        this.houses = items;
        this.loading = false;
      },
      error: () => {
        this.houses = [];
        this.loading = false;
      },
    });
  }

  nextPage(): void {
    this.page++;
    this.load();
  }

  prevPage(): void {
    if (this.page === 1) return;
    this.page--;
    this.load();
  }
}
