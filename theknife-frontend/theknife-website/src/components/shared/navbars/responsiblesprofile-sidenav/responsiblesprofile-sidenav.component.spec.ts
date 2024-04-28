/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResponsiblesprofileSidenavComponent } from './responsiblesprofile-sidenav.component';

describe('ResponsiblesprofileSidenavComponent', () => {
  let component: ResponsiblesprofileSidenavComponent;
  let fixture: ComponentFixture<ResponsiblesprofileSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiblesprofileSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblesprofileSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
