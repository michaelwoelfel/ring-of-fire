import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndscreenComponent } from './endscreen.component';

describe('EndscreenComponent', () => {
  let component: EndscreenComponent;
  let fixture: ComponentFixture<EndscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndscreenComponent]
    });
    fixture = TestBed.createComponent(EndscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
