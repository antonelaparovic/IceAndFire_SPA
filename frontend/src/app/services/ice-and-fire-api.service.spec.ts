import { TestBed } from '@angular/core/testing';

import { IceAndFireApiService } from './ice-and-fire-api.service';

describe('IceAndFireApiService', () => {
  let service: IceAndFireApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceAndFireApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
