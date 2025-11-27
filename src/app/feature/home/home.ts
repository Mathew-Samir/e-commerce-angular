import { Component, signal } from '@angular/core';
import { Buttons } from '../../shared/components/ui/buttons/buttons';

@Component({
  selector: 'app-home',
  imports: [Buttons],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isLoading = signal<boolean>(false);
  submit() {
    this.isLoading.set(true);
  }
}
