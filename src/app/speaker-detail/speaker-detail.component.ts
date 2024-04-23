import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from '../shared/interfaces';

@Component({
  selector: 'app-speaker-detail',
  standalone: true,
  imports: [],
  templateUrl: './speaker-detail.component.html',
})
export class SpeakerDetailComponent {
  private router = inject(Router);
  speaker: Speaker =
    this.router.getCurrentNavigation()?.extras.state?.['speaker'];
}
