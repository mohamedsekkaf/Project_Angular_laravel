import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeimageComponent } from './homeimage.component';

describe('HomeimageComponent', () => {
  let component: HomeimageComponent;
  let fixture: ComponentFixture<HomeimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
