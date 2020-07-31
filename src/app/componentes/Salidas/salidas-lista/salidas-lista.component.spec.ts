import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasListaComponent } from './salidas-lista.component';

describe('SalidasListaComponent', () => {
  let component: SalidasListaComponent;
  let fixture: ComponentFixture<SalidasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
