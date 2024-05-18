import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../services/api.service';
import { UserCardComponent } from '../user-card/user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatCardModule, HttpClientTestingModule],
      declarations: [UserCardComponent],
      providers: [ApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user details correctly', () => {
    const mockUser = {
      name: 'Test User',
      description: 'This is a test user',
      topics: ['angular', 'testing'],
      html_url: 'https://github.com/testuser'
    };
    component.user = mockUser;
    fixture.detectChanges();

    const cardTitle = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const cardSubtitle = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
    const topics = fixture.debugElement.queryAll(By.css('.topic'));

    expect(cardTitle.textContent).toContain('Test User');
    expect(cardSubtitle.textContent).toContain('This is a test user');
    expect(topics.length).toBe(2);
    expect(topics[0].nativeElement.textContent).toContain('angular');
    expect(topics[1].nativeElement.textContent).toContain('testing');
  });

  it('should call openGitRepo when mat-card is clicked', () => {
    spyOn(component, 'openGitRepo');

    component.user = {
      name: 'Test User',
      description: 'This is a test user',
      topics: ['angular', 'testing'],
      html_url: 'https://github.com/testuser'
    };
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('mat-card'));
    card.triggerEventHandler('click', null);

    expect(component.openGitRepo).toHaveBeenCalled();
  });

  it('openGitRepo should open a new window with the user\'s GitHub URL', () => {
    const mockUser = {
      name: 'Test User',
      description: 'This is a test user',
      topics: ['angular', 'testing'],
      html_url: 'https://github.com/testuser'
    };
    component.user = mockUser;
    spyOn(window, 'open');

    component.openGitRepo();

    expect(window.open).toHaveBeenCalledWith('https://github.com/testuser', '_blank');
  });
});
