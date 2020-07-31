import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaNuevaComponent } from './salida-nueva.component';

describe('SalidaNuevaComponent', () => {
  let component: SalidaNuevaComponent;
  let fixture: ComponentFixture<SalidaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
