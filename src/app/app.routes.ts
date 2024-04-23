import { Routes } from '@angular/router';
import { SpeakersComponent } from './speakers/speakers.component';

export const routes: Routes = [
  {
    path: 'speakers',
    loadComponent: () =>
      import('./speakers/speakers.component').then((m) => m.SpeakersComponent),
  },
  {
    path: '',
    redirectTo: 'speakers',
    pathMatch: 'full',
  },
];
