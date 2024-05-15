import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{
  @Input()
  user :any;
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit() {
  
  }

  openGitRepo(){
    window.open(this.user.html_url, '_blank');
  }
}
