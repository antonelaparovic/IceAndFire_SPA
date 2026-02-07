import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-key-value-view',
  templateUrl: './key-value-view.component.html',
  styleUrls: ['./key-value-view.component.scss'],
})
export class KeyValueViewComponent {
  @Input() data: Record<string, any> | null = null;

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  formatLabel(key: string): string {
    // camelCase -> camel Case
    return key.replaceAll(/([a-z])([A-Z])/g, '$1 $2');
  }
}
