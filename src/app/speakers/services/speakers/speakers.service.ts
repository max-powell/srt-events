import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RandomuserResponse } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeakersService {
  private httpClient = inject(HttpClient);

  getSpeakers(page = 1): Observable<RandomuserResponse> {
    return this.httpClient.get<RandomuserResponse>(
      `https://randomuser.me/api/?results=9&page=${page}`,
    );
  }
}
