import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() updateCurrentPageEvent = new EventEmitter<number>();
  @Output() updatePageSizeEvent = new EventEmitter<number>();
  @Input() totalRecords: number = 0;

  pageSize = 10;
  pages: number[] = [];
  currentPage = 1;
  totalPages = 0;

  constructor() {
  }
  ngOnInit(): void {
    this.setPages();
  }

  setPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    let startPage: number, endPage: number;
    if (this.totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (this.currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (this.currentPage + 4 >= this.totalPages) {
        startPage = this.totalPages - 9;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - 5;
        endPage = this.currentPage + 4;
      }
    }
    this.pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.setPages();
    this.updateCurrentPageEvent.emit(this.currentPage);
  }

  setPageSize(event: any) {
    this.pageSize = parseInt(event.target.value);
    this.updatePageSizeEvent.emit(this.pageSize);
  }
}
