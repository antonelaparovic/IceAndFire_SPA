import { Component, OnInit } from '@angular/core';
import { IceAndFireApiService } from '../../services/ice-and-fire-api.service';
import { CharacterListItem } from '../../models/character';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
  characters: CharacterListItem[] = [];
  loading = true;

  page = 1;
  pageSize = 20;

  constructor(private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.api.getCharacters(this.page, this.pageSize).subscribe({
      next: (items) => {
        this.characters = items;
        this.loading = false;
      },
      error: () => {
        this.characters = [];
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
