import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ConductorService} from '../../../services/conductor.service';
import { NotificacionService} from '../../../services/notificacion.service';
import { VehiculoInterface } from '../../../modelos/vehiculo';
import { ConductorInterface } from '../../../modelos/conductor';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-registrar-vehiculo',
  templateUrl: './registrar-vehiculo.component.html',
  styleUrls: ['./registrar-vehiculo.component.css']
})



export class RegistrarVehiculoComponent implements OnInit {


  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      placa: new FormControl('', [Validators.required]),
      marca: new FormControl('',[Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      conductor: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required]),
      imageVehiculo: new FormControl('', [Validators.required]),  
      
    });
  }

  public vehiculoForm: FormGroup;
  private image: any;


 
  constructor( private router:Router, 
    private vehiculoService: VehiculoService, 
    private conductorService: ConductorService,
    public dialogRef: MatDialogRef<RegistrarVehiculoComponent>,
    private notificacionService: NotificacionService) {

      this.vehiculoForm = this.createFormGroup();
     }

     private conductores: ConductorInterface[];


  ngOnInit() {
    this.getListConductores();
  }

  // PARA GUARDAR UN CONDUCTOR

  onSaveVehiculo(data:VehiculoInterface){ //vehiculoForm: FormGroup){

  this.vehiculoService.uploadImage(data, this.image);
    /*
    if(vehiculoForm.value){
      this.vehiculoService.addVehiculo(vehiculoForm.value);
    }

    this.vehiculoForm.reset(); 

    */
  }





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
  get imageVehiculo() { return this.vehiculoForm.get('imageVehiculo');}

  onClose(){
    this.vehiculoForm.reset();
    this.dialogRef.close();
  }

    // PARA SUBIR IMAGEN
    handleImage(event: any): void{
      this.image = event.target.files[0];
      //console.log('IMAGE', this.image);
    }


}
