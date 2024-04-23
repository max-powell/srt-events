import { Component, computed, input } from '@angular/core';
import { Speaker } from '../../../shared/interfaces';

@Component({
  selector: 'app-speaker-card',
  standalone: true,
  imports: [],
  templateUrl: './speaker-card.component.html',
  styleUrl: './speaker-card.component.scss',
})
export class SpeakerCardComponent {
  speaker = input.required<Speaker>();
  flagEmoji = computed(() => {
    const speaker = this.speaker();
    return this.getFlagEmoji(speaker.nat);
  });

  private getFlagEmoji(countryCode: string) {
    return String.fromCodePoint(
      127397 + countryCode.charCodeAt(0),
      127397 + countryCode.charCodeAt(1),
    );
  }
}
