import { Component, inject, OnInit, signal } from '@angular/core';
import { FlowbitService } from './core/services/flowbit/flowbit';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('e-commerce');
  private flowbiteService = inject(FlowbitService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded', flowbite);
    });
  }
}
