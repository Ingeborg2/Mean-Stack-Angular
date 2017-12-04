import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGemsComponent } from './delete-gems.component';

describe('DeleteGemsComponent', () => {
  let component: DeleteGemsComponent;
  let fixture: ComponentFixture<DeleteGemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteGemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
