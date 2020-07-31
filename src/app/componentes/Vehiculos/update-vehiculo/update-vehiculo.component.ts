import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// SERVICIOS VEHICULO

import { VehiculoService } from '../../../services/vehiculo.service';
import { ConductorService} from '../../../services/conductor.service';
import { ConductorInterface } from '../../../modelos/conductor'; 
import { NgForm } from '@angular/forms';
import { NotificacionService} from '../../../services/notificacion.service';
import { VehiculoInterface } from '../../../modelos/vehiculo';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-vehiculo',
  templateUrl: './update-vehiculo.component.html',
  styleUrls: ['./update-vehiculo.component.css']
})
export class UpdateVehiculoComponent implements OnInit {

  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      placa: new FormControl('', [Validators.required]),
      marca: new FormControl('',[Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      conductor: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required]),
      //imageConductor: new FormControl('', [Validators.required]),  
    

    });
  }

  public vehiculoForm: FormGroup;
  //private image: any;

  constructor(private vehiculoService: VehiculoService,
    private conductorService: ConductorService, 
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<UpdateVehiculoComponent>,
    
    private nuevoConductor: MatDialog) { 
      this.vehiculoForm = this.createFormGroup();
    }

    private conductores: ConductorInterface[];

  ngOnInit() {

    this.getListConductores();
  }

   // PARA GUARDAR UN CONDUCTOR

   onEditVehiculo(vehiculoForm: FormGroup){

    if(vehiculoForm){
      this.vehiculoService.updateVehiculo(vehiculoForm.value);
    }

    this.vehiculoForm.reset(); 
  }


  // LISTAR CONDUCTORES

  getListConductores() {
    this.conductorService.getConductores().subscribe(conductores => {
      this.conductores = conductores;
    });
  }

   //--Limpiar Formulario

   onResetForm(){
    this.vehiculoForm.reset();
  }

  get id() { return this.vehiculoForm.get('id');}
  get placa() { return this.vehiculoForm.get('placa');}
  get marca() { return this.vehiculoForm.get('marca');}
  get modelo() { return this.vehiculoForm.get('modelo');}
  get conductor(){ return this.vehiculoForm.get('conductor');}
  get capacidad() { return this.vehiculoForm.get('capacidad');}

  onClose(){
    this.vehiculoForm.reset();
    this.dialogRef.close();
  }



}
