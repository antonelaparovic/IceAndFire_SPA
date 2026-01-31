import { Component, OnInit } from '@angular/core';
import { IceAndFireApiService } from 'src/app/services/ice-and-fire-api.service';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss']
})
export class HousesListComponent implements OnInit {
  constructor(private readonly api: IceAndFireApiService) { }

  ngOnInit(): void {
    this.api.getHouses(1, 3).subscribe(x => console.log('houses list', x));
    this.api.getHouseById('1').subscribe(x => console.log('house details', x));

  }
}
