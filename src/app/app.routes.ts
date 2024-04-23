import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'speakers',
    loadComponent: () =>
      import('./speakers/speakers.component').then((m) => m.SpeakersComponent),
  },
  {
    path: 'speaker-detail',
    loadComponent: () =>
      import('./speaker-detail/speaker-detail.component').then(
        (m) => m.SpeakerDetailComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'speakers',
    pathMatch: 'full',
  },
];
