/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginsNavComponent } from './logins-nav.component';

describe('LoginsNavComponent', () => {
  let component: LoginsNavComponent;
  let fixture: ComponentFixture<LoginsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
