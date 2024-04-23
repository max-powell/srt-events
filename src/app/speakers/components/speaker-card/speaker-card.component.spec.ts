import {
  ComponentFixture,
  TestBed,
  flushMicrotasks,
} from '@angular/core/testing';
import { SpeakerCardComponent } from './speaker-card.component';
import { Speaker } from '../../../shared/interfaces';
import { By } from '@angular/platform-browser';

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

fdescribe('SpeakerCardComponent', () => {
  let component: SpeakerCardComponent;
  let fixture: ComponentFixture<SpeakerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeakerCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('speaker', mockSpeaker);
    fixture.detectChanges();
  });

  it('displays the speaker information correctly', () => {
    const cardBody = fixture.debugElement.query(By.css('.speaker-card__body'))
      .nativeElement as HTMLDivElement;
    expect(cardBody.textContent).toContain(
      `${mockSpeaker.name.first} ${mockSpeaker.name.last}`,
    );
    expect(cardBody.textContent).toContain('🇩🇪');
    expect(cardBody.textContent).toContain(
      `${mockSpeaker.location.city}, ${mockSpeaker.location.country}`,
    );
    expect(cardBody.textContent).toContain(mockSpeaker.email);
  });
});
