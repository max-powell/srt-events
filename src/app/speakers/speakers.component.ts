import { Component, effect, inject } from '@angular/core';
import { SpeakersService } from './services';
import { SpeakerCardComponent } from './components';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [SpeakerCardComponent],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss',
})
export class SpeakersComponent {
  private speakersService = inject(SpeakersService);
  speakers = this.speakersService.getSpeakers();
}
