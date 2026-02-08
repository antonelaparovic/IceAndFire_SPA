import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
})
export class FavouriteButtonComponent {
  @Input() active = false;
  @Input() ariaLabel = 'Toggle favourite';

  @Output() toggle = new EventEmitter<void>();

  onClick(): void {
    this.toggle.emit();
  }
}
