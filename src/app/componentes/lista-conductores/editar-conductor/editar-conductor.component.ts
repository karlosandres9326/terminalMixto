import { Component, OnInit, Input } from '@angular/core';
import { ConductorService } from '../../../services/conductor.service';
import { ConductorInterface } from '../../../modelos/conductor'; 
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService} from '../../../services/notificacion.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-editar-conductor',
  templateUrl: './editar-conductor.component.html',
  styleUrls: ['./editar-conductor.component.css']
})
export class EditarConductorComponent implements OnInit {

  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      nombres: new FormControl('',[Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      licencia: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      direccion: new FormControl('', [Validators.required]),
      imageConductor: new FormControl(''),  
      

      

    });
  }

  public conductorForm: FormGroup;

  // PROPIEDADES IMAGEN

  private image: any;
  private imageOriginal: any;
  

  @Input() conductor: ConductorInterface; 

  constructor(private conductorService: ConductorService, 
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<EditarConductorComponent>,
    private nuevoConductor: MatDialog) {

      this.conductorForm = this.createFormGroup();

     }

  ngOnInit() {

    //this.image = this.conductor.imageConductor;
    
    //this.imageOriginal = this.conductor.imageConductor;
  }

   // PARA GUARDAR UN CONDUCTOR

   onEditConductor(conductorForm: FormGroup){//data:ConductorInterface){

    //this.conductorService.preAddConductor(data, this.image);
    //console.log(conductorForm.value);

    if(conductorForm){
     
      this.conductorService.updateConductor(conductorForm.value);
      
    }

    this.conductorForm.reset(); 
  
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
    console.log('IMAGE', this.image);
  }

  // EDITAR CONDUCTOR

   editConductor(conductor: ConductorInterface){
    console.log('Img', this.image);
    console.log('original', this.imageOriginal);
    
      if(this.image === this.imageOriginal){
        conductor.imageConductor = this.imageOriginal;
        this.conductorService.editConductorById(conductor);

        // LLAMAR METODO
      } else {
        // LLAMAR METODO (condutor, this.image)

        this.conductorService.editConductorById(conductor, this.image);
      }
   }

}
