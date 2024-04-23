import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SpeakersService } from './services';
import { SpeakerCardComponent } from './components';
import {
  FormControl,
  FormControlDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounce, debounceTime } from 'rxjs';
import { Speaker } from '../shared/interfaces';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [SpeakerCardComponent, ReactiveFormsModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss',
})
export class SpeakersComponent implements OnInit {
  private speakersService = inject(SpeakersService);

  filter = new FormControl<string | null>(null);

  private speakers = signal<Speaker[]>([]);
  private page = signal(1);
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

  ngOnInit(): void {
    this.speakersService.getSpeakers(this.page()).subscribe(({ results }) => {
      this.speakers.set(results);
    });
  }

  getMoreSpeakers(): void {
    if (this.page()) {
      this.speakersService
        .getSpeakers(this.page()! + 1)
        .subscribe(({ info, results }) => {
          this.speakers.update((speakers) => [...speakers, ...results]);
          this.page.set(info.page);
        });
    }
  }
}
