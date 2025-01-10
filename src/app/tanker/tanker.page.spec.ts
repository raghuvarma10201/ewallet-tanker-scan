import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TankerPage } from './tanker.page';

describe('TankerPage', () => {
  let component: TankerPage;
  let fixture: ComponentFixture<TankerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TankerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
