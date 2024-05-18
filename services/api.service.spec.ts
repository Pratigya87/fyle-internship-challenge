import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 it('should return expected user data', () => {
    const expectedUser = {id: 141490067, name: 'Pratigya Patidar'};
    service.getUser('Pratigya87').subscribe(user => {
      expect(user).toEqual(expectedUser);
    });
    const req = httpTestingController.expectOne('https://api.github.com/users/Pratigya87');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedUser);
  });

  it('should return expected repos', () => {
    const expectedRepos = [{id: 800010880, name: 'fyle-internship-challenge'}];
    service.getUserRepo('Pratigya87').subscribe(repos => {
      expect(repos).toEqual(expectedRepos);
    });
    const req = httpTestingController.expectOne('https://api.github.com/users/Pratigya87/repos?page=0&per_page=10');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedRepos);
  });
});
