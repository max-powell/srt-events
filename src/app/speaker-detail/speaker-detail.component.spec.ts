import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerDetailComponent } from './speaker-detail.component';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Speaker } from '../shared/interfaces';

const mockSpeaker: Speaker = {
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
};
const mockRouter = {
  getCurrentNavigation() {
    return {
      extras: {
        state: { speaker: mockSpeaker },
      } as NavigationExtras,
    } as Navigation;
  },
} as Router;

describe('SpeakerDetailComponent', () => {
  let component: SpeakerDetailComponent;
  let fixture: ComponentFixture<SpeakerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerDetailComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('displays the speaker information correctly', () => {
    const cardBody = fixture.debugElement.query(By.css('.speaker-detail'))
      .nativeElement as HTMLDivElement;
    expect(cardBody.textContent).toContain(
      `${mockSpeaker.name.first} ${mockSpeaker.name.last}`,
    );
    expect(cardBody.textContent).toContain(
      `${mockSpeaker.location.city}, ${mockSpeaker.location.country}`,
    );
    expect(cardBody.textContent).toContain(mockSpeaker.email);
  });
});
