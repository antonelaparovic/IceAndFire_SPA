import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-value-view',
  templateUrl: './key-value-view.component.html',
})
export class KeyValueViewComponent {
  @Input() data: Record<string, any> | null = null;

  isArray(value: any): boolean {
    return Array.isArray(value);
  }
}
