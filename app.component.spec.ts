import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AppComponent],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.githubUsername).toBe('johnpapa');
    expect(component.title).toBe('fyle-frontend-challenge');
    expect(component.pageSize).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(component.loading).toBe(false);
  });

  it('should call onSearch and set userInfo and totalRecords', () => {
    const mockUserResponse = { public_repos: 5, avatar_url: '', name: '', bio: '', location: '', twitter_username: '', html_url: '' };
    spyOn(apiService, 'getUser').and.returnValue(of(mockUserResponse));
    spyOn(component, 'getUserRepo').and.stub();

    component.onSearch();
    expect(apiService.getUser).toHaveBeenCalledWith('johnpapa');
    expect(component.userInfo).toEqual(mockUserResponse);
    expect(component.totalRecords).toBe(mockUserResponse.public_repos);
    expect(component.loading).toBe(false);
    expect(component.getUserRepo).toHaveBeenCalled();
  });

  it('should call getUserRepo and set userRepoList', () => {
    const mockRepoResponse = [{ name: 'repo1' }, { name: 'repo2' }];
    spyOn(apiService, 'getUserRepo').and.returnValue(of(mockRepoResponse));

    component.getUserRepo();
    expect(apiService.getUserRepo).toHaveBeenCalledWith('johnpapa', 10, 1);
    expect(component.userRepoList).toEqual(mockRepoResponse);
  });

  it('should update currentPage and call getUserRepo on setPage', () => {
    spyOn(component, 'getUserRepo').and.stub();

    component.setPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.getUserRepo).toHaveBeenCalled();
  });

  it('should update pageSize and call getUserRepo on setPageSize', () => {
    spyOn(component, 'getUserRepo').and.stub();

    component.setPageSize(20);
    expect(component.pageSize).toBe(20);
    expect(component.getUserRepo).toHaveBeenCalled();
  });

  it('should render the title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div span')?.textContent).toContain('fyle-frontend-challenge app is running!');
  });

  it('should call onSearch when the Search button is clicked', () => {
    spyOn(component, 'onSearch').and.callThrough();

    fixture.detectChanges();
    const searchButton = fixture.debugElement.query(By.css('button'));
    searchButton.triggerEventHandler('click', null);

    expect(component.onSearch).toHaveBeenCalled();
  });

  // Additional tests to cover HTML template interactions and elements can be added here

});
