/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecoverpasswordResponsibleComponent } from './recoverpassword-responsible.component';

describe('RecoverpasswordResponsibleComponent', () => {
  let component: RecoverpasswordResponsibleComponent;
  let fixture: ComponentFixture<RecoverpasswordResponsibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpasswordResponsibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpasswordResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
