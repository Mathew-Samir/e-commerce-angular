import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
})
export class Buttons {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() bgColor: string | null = null;
  @Input() textColor: string | null = null;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input({ transform: booleanAttribute }) isLoading = false;
  @Input() loadingText?: string;
  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.clicked.emit(event);
  }
}
