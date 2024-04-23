import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SpeakersComponent } from './speakers.component';
import { SpeakersService } from './services';
import { Speaker } from '../shared/interfaces';
import { of } from 'rxjs';
import { RandomuserResponse } from './interfaces';
import { ActivatedRoute } from '@angular/router';

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

const mockAdditionalSpeakers: Speaker[] = [
  {
    name: {
      title: 'Mr',
      first: 'Timothy',
      last: 'Garrett',
    },
    location: {
      city: 'Lisburn',
      country: 'United Kingdom',
    },
    email: 'timothy.garrett@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/86.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/86.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/86.jpg',
    },
    nat: 'GB',
  },
];
const mockAdditionalResponse: RandomuserResponse = {
  info: {
    page: 2,
    results: 10,
  },
  results: mockAdditionalSpeakers,
};

const mockActivatedRoute = {} as ActivatedRoute;

describe('SpeakersComponent', () => {
  let component: SpeakersComponent;
  let fixture: ComponentFixture<SpeakersComponent>;

  const mockSpeakersService = jasmine.createSpyObj<SpeakersService>(
    'SpeakersService',
    ['getSpeakers'],
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakersComponent],
      providers: [
        { provide: SpeakersService, useValue: mockSpeakersService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockSpeakersService.getSpeakers.and.returnValues(
      of(mockResponse),
      of(mockAdditionalResponse),
    );
    fixture = TestBed.createComponent(SpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('filter', () => {
    it('should filter the list of users when the value is entered', fakeAsync(() => {
      expect(component.filteredSpeakers()).toEqual(mockSpeakers);
      component.filter.patchValue('ero');
      tick(500);
      expect(component.filteredSpeakers().length).toBe(1);
      expect(component.filteredSpeakers()[0]).toBe(mockSpeakers[1]);
    }));
  });

  describe('getMoreSpeakers', () => {
    it('should retrieve the next set of speakers', () => {
      expect(component.filteredSpeakers()).toEqual(mockSpeakers);
      component.getMoreSpeakers();
      expect(mockSpeakersService.getSpeakers).toHaveBeenCalledWith(2);
      expect(component.filteredSpeakers()).toEqual([
        ...mockSpeakers,
        ...mockAdditionalSpeakers,
      ]);
    });
  });
});
