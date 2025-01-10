import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanDetailPage } from './scan-detail.page';

describe('ScanDetailPage', () => {
  let component: ScanDetailPage;
  let fixture: ComponentFixture<ScanDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScanDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
