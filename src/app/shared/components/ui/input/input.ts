import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  // Basic
  @Input() type = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;

  // UI
  @Input() label = '';
  @Input() icon?: string; // class name or svg path
  @Input() required = false;

  // Validation
  @Input() error = '';
  @Input() touched = false;

  // Styling
  @Input() inputClass = '';
  @Input() wrapperClass = '';
  @Input() labelClass = '';
  @Input() errorClass = '';

  // Events
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onBlur() {
    this.blur.emit();
  }
}
