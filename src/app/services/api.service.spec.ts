import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data from GitHub API', () => {
    const dummyUser = { login: 'Pratigya87', id: 1 };
    service.getUser('Pratigya87').subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/Pratigya87`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUser);
  });

  it('should fetch user repositories from GitHub API with pagination', () => {
    const dummyRepos = [{ name: 'fyle-internship-challenge' }];
    service.getUserRepo('Pratigya87', 10, 1).subscribe(repos => {
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/Pratigya87/repos?page=1&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });

  it('should fetch user repositories from GitHub API without pagination', () => {
    const dummyRepos = [{ name: 'fyle-internship-challenge' }];
    service.getUserRepo('Pratigya87').subscribe(repos => {
      expect(repos).toEqual(dummyRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/Pratigya87/repos?page=0&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepos);
  });

});
