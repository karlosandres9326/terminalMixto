import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaInterface } from '../../../modelos/reserva'; 
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService} from '../../../services/notificacion.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.css']
})
export class EditarReservaComponent implements OnInit {

  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      puesto: new FormControl('', [Validators.required]), 
      

      

    });
  }

  public reservaForm: FormGroup;


  constructor( private reservaService: ReservaService, 
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<EditarReservaComponent>,
    private nuevoReserva: MatDialog) { this.reservaForm = this.createFormGroup();}

  ngOnInit() {
  }

  
  // Guardar los valores del formulario nueva RESERVA

  onEditReserva(reservaForm: FormGroup){

  
    console.log(reservaForm.value.id);

    if(reservaForm){
      this.reservaService.updateReserva(reservaForm.value);
      
      
    }

    this.reservaForm.reset();
  

   
 
  

}

// Limpiar Formulario

onResetForm(){
this.reservaForm.reset();
}


get id() { return this.reservaForm.get('id');}
get cedula() { return this.reservaForm.get('cedula');}
get nombre() { return this.reservaForm.get('nombre');}
get apellido() { return this.reservaForm.get('apellido');}
get edad(){ return this.reservaForm.get('edad');}
get telefono() { return this.reservaForm.get('telefono');}
get email() { return this.reservaForm.get('email');}
get puesto() { return this.reservaForm.get('puesto');}


onClose(){


this.reservaForm.reset();
this.dialogRef.close();
}


initiliazeFormGroup(){

this.reservaForm.setValue(
  {

    id:'',
    cedula: '',
    nombre: '',
    apellido:'',
    edad: '',
    telefono: '',
    email: '',
    puesto: ''
    

  }
);

}










}
