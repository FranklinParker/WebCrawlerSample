import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SapHelpSearchComponent } from './sap-help-search.component';

describe('SapHelpSearchComponent', () => {
  let component: SapHelpSearchComponent;
  let fixture: ComponentFixture<SapHelpSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SapHelpSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SapHelpSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
