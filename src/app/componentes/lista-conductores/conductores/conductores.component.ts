import { Component, OnInit, Input } from '@angular/core';
import { ConductorService } from '../../../services/conductor.service';
import { ConductorInterface } from '../../../modelos/conductor'; 
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService} from '../../../services/notificacion.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      licencia: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      direccion: new FormControl('', [Validators.required]),
      imageConductor: new FormControl('', [Validators.required]),  
      

      

    });
  }



  public conductorForm: FormGroup;
  private image: any;

  constructor( private conductorService: ConductorService, 
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<ConductoresComponent>,
    private nuevoConductor: MatDialog) {

      this.conductorForm = this.createFormGroup();
     }

  ngOnInit() {
  }

  // PARA GUARDAR UN CONDUCTOR

  onSaveConductor(data:ConductorInterface){

    //this.conductorService.preAddConductor(data, this.image);
    //console.log(conductorForm.value);

    console.log('NEW CONDUCTOR', data);
    this.conductorService.uploadImage(data, this.image);

    /*
    this.conductorService.preAddConductor(data, this.image);

    if(conductorForm.value){
      
      this.conductorService.addConductor(conductorForm.value);
      //this.conductorService.preAddConductor(data, this.image);
     
      
    }

    this.conductorForm.reset();

    */

  
}


  //---------- // Limpiar Formulario

  onResetForm(){
    this.conductorForm.reset();
  }

 
  
  get id() { return this.conductorForm.get('id');}
  get cedula() { return this.conductorForm.get('cedula');}
  get nombres() { return this.conductorForm.get('nombres');}
  get apellidos() { return this.conductorForm.get('apellidos');}
  get licencia(){ return this.conductorForm.get('licencia');}
  get telefono() { return this.conductorForm.get('telefono');}
  get direccion() { return this.conductorForm.get('direccion');}
  get imageConductor() {return this.conductorForm.get('imageConductor')};
  


  onClose(){
    this.conductorForm.reset();
    this.dialogRef.close();
  }

  // PARA SUBIR IMAGEN
  handleImage(event: any): void{
    this.image = event.target.files[0];
    //console.log('IMAGE', this.image);
  }

}
