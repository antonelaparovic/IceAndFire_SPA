import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueViewComponent } from './key-value-view.component';

describe('KeyValueViewComponent', () => {
  let component: KeyValueViewComponent;
  let fixture: ComponentFixture<KeyValueViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeyValueViewComponent]
    });
    fixture = TestBed.createComponent(KeyValueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
