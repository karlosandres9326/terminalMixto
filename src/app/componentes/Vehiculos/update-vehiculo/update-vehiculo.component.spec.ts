import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehiculoComponent } from './update-vehiculo.component';

describe('UpdateVehiculoComponent', () => {
  let component: UpdateVehiculoComponent;
  let fixture: ComponentFixture<UpdateVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
