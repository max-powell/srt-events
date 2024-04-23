import { Component, computed, effect, inject } from '@angular/core';
import { SpeakersService } from './services';
import { SpeakerCardComponent } from './components';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [SpeakerCardComponent, ReactiveFormsModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss',
})
export class SpeakersComponent {
  private speakersService = inject(SpeakersService);

  filter = new FormControl<string | null>(null);

  private speakers = this.speakersService.getSpeakers();
  private filterString = toSignal(
    this.filter.valueChanges.pipe(debounceTime(500)),
  );
  filteredSpeakers = computed(() => {
    const speakers = this.speakers();
    const filterString = this.filterString()?.toLowerCase();
    if (!speakers) {
      return [];
    }
    if (!filterString) {
      return speakers;
    }
    return speakers.filter(
      (speaker) =>
        speaker.name.first.toLowerCase().includes(filterString) ||
        speaker.name.last.toLowerCase().includes(filterString),
    );
  });
}
