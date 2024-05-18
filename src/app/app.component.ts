import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userInfo: any;
  userRepoList: any[] = [];
  githubUsername: string = 'johnpapa';
  title = "fyle-frontend-challenge"
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  loading = false;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.onSearch()
  }

  onSearch() {
    this.loading = true;
    this.apiService.getUser(this.githubUsername).subscribe(res=>{
      this.userInfo = res;
      this.totalRecords = this.userInfo.public_repos;
      this.loading = false;
      this.getUserRepo();
    });
  }

  getUserRepo(){
    this.apiService.getUserRepo(this.githubUsername, this.pageSize, this.currentPage).subscribe((res: any) => {
      this.userRepoList = res;
    });
  }

  setPage(page: any) {
    this.currentPage = page;
    this.getUserRepo()
  }

  setPageSize(pageSize:any) {
    this.pageSize = pageSize;
    this.getUserRepo()
  }
}
