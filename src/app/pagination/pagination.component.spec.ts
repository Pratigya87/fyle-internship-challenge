import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.pageSize).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(0);
  });

  it('should set pages correctly based on totalRecords', () => {
    component.totalRecords = 95;  // 10 records per page, 10 pages expected
    component.ngOnInit();
    expect(component.totalPages).toBe(10);
    expect(component.pages.length).toBe(10);
  });

  it('should set pages correctly with currentPage > 6', () => {
    component.currentPage = 7;
    component.totalRecords = 2000;  // 10 records per page, 10 pages expected
    component.ngOnInit();
    expect(component.totalPages).toBe(200);
    expect(component.pages.length).toBe(10);
  });
  it('should set pages correctly with currentPage > 6 and totalPages < 10', () => {
    component.currentPage = 18;
    component.totalRecords = 200;  // 10 records per page, 10 pages expected
    component.ngOnInit();
    expect(component.totalPages).toBe(20);
    expect(component.pages.length).toBe(10);
  });

  it('should emit updatePageSizeEvent when page size is changed', () => {
    spyOn(component.updatePageSizeEvent, 'emit');

    const pageSizeSelect: DebugElement = fixture.debugElement.query(By.css('#pageSize'));
    pageSizeSelect.triggerEventHandler('change', { target: { value: '20' } });

    expect(component.pageSize).toBe(20);
    expect(component.updatePageSizeEvent.emit).toHaveBeenCalledWith(20);
  });

  it('should emit updateCurrentPageEvent when page is changed', () => {
    spyOn(component.updateCurrentPageEvent, 'emit');

    component.totalRecords = 100;
    component.setPages();
    fixture.detectChanges();

    const pageItem = fixture.debugElement.query(By.css('.pagination .page-item:nth-child(3)'));  // Should be page 2
    pageItem.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(2);
    expect(component.updateCurrentPageEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should update pages when next page is clicked', () => {
    component.totalRecords = 100;
    component.setPages();
    fixture.detectChanges();

    const nextPageItem = fixture.debugElement.query(By.css('.pagination .page-item:last-child'));
    nextPageItem.triggerEventHandler('click', null);

    expect(component.currentPage).toBe(2);
    expect(component.pages.length).toBeGreaterThan(0);
  });

  it('should handle page size change', () => {
    spyOn(component.updatePageSizeEvent, 'emit');
    
    const selectElement = fixture.debugElement.query(By.css('select'));
    selectElement.triggerEventHandler('change', { target: { value: '50' } });
    
    expect(component.pageSize).toBe(50);
    expect(component.updatePageSizeEvent.emit).toHaveBeenCalledWith(50);
  });

  it('should handle page change', () => {
    spyOn(component.updateCurrentPageEvent, 'emit');
    
    component.totalRecords = 200;
    component.ngOnInit();
    
    const pageElement = fixture.debugElement.queryAll(By.css('.page-item'))[1];
    pageElement.triggerEventHandler('click', null);
    
    expect(component.currentPage).toBe(2);
    expect(component.updateCurrentPageEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should render correct number of pages', () => {
    component.totalRecords = 100;
    component.ngOnInit();
    fixture.detectChanges();
    
    const pageItems = fixture.debugElement.queryAll(By.css('.page-item'));
    expect(pageItems.length).toBe(12);  // 10 pages + 2 for next and previous
  });
});
