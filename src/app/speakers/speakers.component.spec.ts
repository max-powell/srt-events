import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SpeakersComponent } from './speakers.component';
import { SpeakersService } from './services';
import { signal } from '@angular/core';
import { Speaker } from '../shared/interfaces';

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

describe('SpeakersComponent', () => {
  let component: SpeakersComponent;
  let fixture: ComponentFixture<SpeakersComponent>;

  const mockSpeakersService = jasmine.createSpyObj<SpeakersService>(
    'SpeakersService',
    { getSpeakers: signal(mockSpeakers) },
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakersComponent],
      providers: [{ provide: SpeakersService, useValue: mockSpeakersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should filter the list of users when the value is entered', fakeAsync(() => {
    expect(component.filteredSpeakers()).toEqual(mockSpeakers);
    component.filter.patchValue('ero');
    tick(500);
    expect(component.filteredSpeakers().length).toBe(1);
    expect(component.filteredSpeakers()[0]).toBe(mockSpeakers[1]);
  }));
});
