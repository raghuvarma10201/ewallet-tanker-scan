import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelslistPage } from './hotelslist.page';

describe('HotelslistPage', () => {
  let component: HotelslistPage;
  let fixture: ComponentFixture<HotelslistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HotelslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
