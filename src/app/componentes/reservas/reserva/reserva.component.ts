import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaInterface } from '../../../modelos/reserva';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificacionService } from '../../../services/notificacion.service';
//import { MatDialogRef, MatDialogConfig , MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { ListaPasajerosComponent } from '../lista-pasajeros/lista-pasajeros.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ViewEncapsulation} from '@angular/core';


// IMPORTACIONES PARA ROLES

import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioInterface } from '../../../modelos/usuario';




@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ReservaComponent implements OnInit {

  idUser: String; // ya la puedes usar como variable, solamente la agregas


  puestosUsados: any;

  //Puestos seleccionado
  puesto1 = false;
  puesto2 = false;
  puesto3 = false;
  puesto4 = false;
  puesto5 = false;
  puesto6 = false;
  puesto7 = false;
  puesto8 = false;


  createFormGroup() {

    return new FormGroup({
      viaje: new FormControl(this.data.placa.id),
      placa: new FormControl(this.data.placa.vehiculo),
      fecha: new FormControl(this.data.placa.fecha),
      hora: new FormControl(this.data.placa.hora),
      id: new FormControl(''),
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
      email: new FormControl(''),
      puesto: new FormControl('', [Validators.required]),
      userUid: new FormControl('')




    });
  }

  public reservaForm: FormGroup;



  constructor(private reservaService: ReservaService,
    private notificacionService: NotificacionService,
    public dialogRef: MatDialogRef<ReservaComponent>,
    private nuevoReserva: MatDialog,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.reservaForm = this.createFormGroup();
  }

  public isAdmin: any = null;
  public userUid: String = null;

  private reservas: ReservaInterface[];

  mostrar: boolean = true;

  onToggle() {
    this.mostrar = !this.mostrar;
    this.idUser = localStorage.getItem("idUsuario");
  }

  ngOnInit() {

    this.idUser = localStorage.getItem("idUsuario");
    //console.log(this.data.placa);
    console.log(this.data);

    this.data.reservas
      .filter((value:any) =>{         
        return value.placa === this.data.placa.vehiculo && value.fecha === this.data.placa.fecha && value.hora === this.data.placa.hora;
      })
      .map((puestoUsado: any) => {
        //console.log(puestoUsado);
        this.seleccionarPuesto(+puestoUsado.puesto);
      });

    
    //console.log("puesto1", this.puesto1);
    //console.log("puesto3", this.puesto3);
    //console.log("puesto8", this.puesto8);
    //console.log('puestos usados', puestosUsados);
    //this.puestosUsados = puestosUsados;

    this.getListReservas();
    this.getCurrentUser();

  }

  alertaPuestoUsado(puesto: number) {
    alert('Puesto ' + puesto + ' usado')
  }

  // Guardar los valores del formulario nueva RESERVA

  onSaveReserva(reservaForm: FormGroup) {


    console.log(reservaForm.value.id);

    if (reservaForm) {
      reservaForm.value.userUid = this.idUser;
      this.reservaService.addReserva(reservaForm.value);



    }

    this.reservaForm.reset();

  }

  // PARA VERIFICAR SI ES ADMIN DESPUES DE AUTENTICADO

  getCurrentUser() {
    this.authService.isAuthenticated().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }

      //console.log("ID USER",auth.uid);
      localStorage.setItem("idUsuario", auth.uid); //donde necesitas agregar ese dato, indicame el modal..OK
    })
  }


  getListReservas() {
    this.reservaService.getReservas().subscribe(reservas => {
      this.reservas = reservas;

    });
  }






  // Limpiar Formulario

  onResetForm() {
    this.reservaForm.reset();
  }


  get id() { return this.reservaForm.get('id'); }
  get cedula() { return this.reservaForm.get('cedula'); }
  get nombre() { return this.reservaForm.get('nombre'); }
  get apellido() { return this.reservaForm.get('apellido'); }
  get edad() { return this.reservaForm.get('edad'); }
  get telefono() { return this.reservaForm.get('telefono'); }
  get email() { return this.reservaForm.get('email'); }
  get puesto() { return this.reservaForm.get('puesto'); }


  onClose() {


    this.reservaForm.reset();
    this.dialogRef.close();
  }


  initiliazeFormGroup() {

    this.reservaForm.setValue(
      {

        id: '',
        cedula: '',
        nombre: '',
        apellido: '',
        edad: '',
        telefono: '',
        email: '',
        puesto: ''


      }
    );

  }




  seleccionarPuesto(puesto: number) {

    switch (puesto) {
      case 1:
        this.puesto1 = true;
        break;
      case 2:
        this.puesto2 = true;
        break;
      case 3:
        this.puesto3 = true;
        break;
      case 4:
        this.puesto4 = true;
        break;
      case 5:
        this.puesto5 = true;
        break;
      case 6:
        this.puesto6 = true;
        break;
      case 7:
        this.puesto7 = true;
        break;
      case 8:
        this.puesto8 = true;
        break;
      default:
        break;
    }


  }












}
