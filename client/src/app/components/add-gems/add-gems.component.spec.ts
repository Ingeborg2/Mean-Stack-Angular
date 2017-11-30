import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGemsComponent } from './add-gems.component';

describe('AddGemsComponent', () => {
  let component: AddGemsComponent;
  let fixture: ComponentFixture<AddGemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
