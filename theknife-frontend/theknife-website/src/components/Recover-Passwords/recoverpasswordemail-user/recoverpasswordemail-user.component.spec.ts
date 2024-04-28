import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpasswordemailUserComponent } from './recoverpasswordemail-user.component';

describe('RecoverpasswordemailUserComponent', () => {
  let component: RecoverpasswordemailUserComponent;
  let fixture: ComponentFixture<RecoverpasswordemailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverpasswordemailUserComponent]
    });
    fixture = TestBed.createComponent(RecoverpasswordemailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
