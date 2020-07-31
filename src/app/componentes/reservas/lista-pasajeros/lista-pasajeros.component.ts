import { Component, OnInit, Input } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { ReservaInterface } from '../../../modelos/reserva'; 
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { Router } from '@angular/router';
import { ReservaComponent } from '../../reservas/reserva/reserva.component';
import { EditarReservaComponent } from '../editar-reserva/editar-reserva.component';
import { MatDialogRef } from '@angular/material';

// IMPORTACIONES PARA ROLES

import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioInterface } from '../../../modelos/usuario';


@Component({
  selector: 'app-lista-pasajeros',
  templateUrl: './lista-pasajeros.component.html',
  styleUrls: ['./lista-pasajeros.component.css']
})
export class ListaPasajerosComponent implements OnInit {

  
  
  constructor(
    private reservaService: ReservaService, private editarReserva: MatDialog, private router:Router,
    private authService: AuthenticationService
    ) { }
 

  private reservas: ReservaInterface[];

  // PROPIEDADES PARA VER ROL ADMIN

  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {

    this.getListReservas();
    this.getCurrentUser();
    
  }


  // PARA VERIFICAR SI ES ADMIN O NO DESPUES DE AUTENTICADO

  getCurrentUser(){
    this.authService.isAuthenticated().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }

      //console.log("ID USER",auth.uid);
      localStorage.setItem("idUsuario", auth.uid); //donde necesitas agregar ese dato, indicame el modal..OK
    })
  }


  getListReservas(){
    this.reservaService.getReservas().subscribe(reservas => {
    this.reservas = reservas;
    });
  }

  getId(){
    this.authService.isAuthenticated().subscribe(auth => {
    this.userUid = auth.uid;
    })
    
  }

  

  onDeleteReserva(idReserva: string): void{
    
    const confirmacion = confirm('¿Está seguro de Eliminar este registro?')
    if(confirmacion){
       this.reservaService.deleteReserva(idReserva);
    }
    else{ }
   
  }

    
  onUpdateReserva(reserva: ReservaInterface){

    
    this.reservaService.selectedReserva = Object.assign({}, reserva);
    const dialogConfig = {};
    
    const dialogRef = this.editarReserva.open(EditarReservaComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
    
   

  }



  
  

  



 

  

  


}


