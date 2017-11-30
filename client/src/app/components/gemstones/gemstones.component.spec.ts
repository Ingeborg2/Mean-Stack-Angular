import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GemstonesComponent } from './gemstones.component';

describe('GemstonesComponent', () => {
  let component: GemstonesComponent;
  let fixture: ComponentFixture<GemstonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GemstonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GemstonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
