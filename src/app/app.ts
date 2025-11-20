import { Component, inject, OnInit, signal } from '@angular/core';
import { FlowbitService } from './core/services/flowbit/flowbit';
import { Navbar } from './layout/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Footer],
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
