/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginResponsiblesComponent } from './login-responsibles.component';

describe('LoginResponsiblesComponent', () => {
  let component: LoginResponsiblesComponent;
  let fixture: ComponentFixture<LoginResponsiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginResponsiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
