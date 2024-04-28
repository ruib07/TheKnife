/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecoverpasswordemailResponsavelComponent } from './recoverpasswordemail-responsavel.component';

describe('RecoverpasswordemailResponsavelComponent', () => {
  let component: RecoverpasswordemailResponsavelComponent;
  let fixture: ComponentFixture<RecoverpasswordemailResponsavelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpasswordemailResponsavelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpasswordemailResponsavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
