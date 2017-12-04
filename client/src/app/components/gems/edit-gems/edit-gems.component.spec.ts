import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGemsComponent } from './edit-gems.component';

describe('EditGemsComponent', () => {
  let component: EditGemsComponent;
  let fixture: ComponentFixture<EditGemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
