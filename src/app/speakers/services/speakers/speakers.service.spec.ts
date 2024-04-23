import { TestBed } from '@angular/core/testing';
import { SpeakersService } from './speakers.service';
import { Speaker } from '../../../shared/interfaces';
import { of } from 'rxjs';
import { RandomuserResponse } from '../../interfaces';
import { HttpClient } from '@angular/common/http';

const mockSpeakers: Speaker[] = [
  {
    name: {
      title: 'Mr',
      first: 'Klaus-Jürgen',
      last: 'Asmus',
    },
    location: {
      city: 'Trostberg',
      country: 'Germany',
    },
    email: 'klaus-jurgen.asmus@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/3.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/3.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    },
    nat: 'DE',
  },
  {
    name: {
      title: 'Miss',
      first: 'Ömür',
      last: 'Eronat',
    },
    location: {
      city: 'Bitlis',
      country: 'Turkey',
    },
    email: 'omur.eronat@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/women/36.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/36.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/36.jpg',
    },
    nat: 'TR',
  },
];
const mockResponse: RandomuserResponse = {
  info: {
    page: 1,
    results: 10,
  },
  results: mockSpeakers,
};

describe('SpeakersService', () => {
  let service: SpeakersService;
  const mockHttpClient = jasmine.createSpyObj<HttpClient>('HttpClient', [
    'get',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });
    service = TestBed.inject(SpeakersService);
  });

  it('should return a RandomUser response', () => {
    mockHttpClient.get.and.returnValue(of(mockResponse));
    service.getSpeakers().subscribe((response) => {
      expect(response).toBe(mockResponse);
    });
  });
});
