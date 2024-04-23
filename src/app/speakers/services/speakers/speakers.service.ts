import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Speaker } from '../../../shared/interfaces';
import { RandomuserResponse } from '../../interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeakersService {
  private httpClient = inject(HttpClient);

  getSpeakers(): Signal<Speaker[] | undefined> {
    return toSignal(
      this.httpClient
        .get<RandomuserResponse>(`https://randomuser.me/api/?results=20&page=1`)
        .pipe(map((res) => res.results)),
    );
  }
}
