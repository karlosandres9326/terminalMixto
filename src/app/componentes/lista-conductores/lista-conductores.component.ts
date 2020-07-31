import { Component, OnInit } from '@angular/core';
import { ConductorService} from '../../services/conductor.service';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { ConductorInterface } from '../../modelos/conductor'; 
import { NgForm } from '@angular/forms';
import { ConductoresComponent } from '../lista-conductores/conductores/conductores.component';
import { EditarConductorComponent } from './editar-conductor/editar-conductor.component';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-lista-conductores',
  templateUrl: './lista-conductores.component.html',
  styleUrls: ['./lista-conductores.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaConductoresComponent implements OnInit {

  constructor(private conductorService: ConductorService, private nuevoConductor: MatDialog, private editarConductor: MatDialog) { }


  private conductores: ConductorInterface[];

  ngOnInit() {

    this.getListConductores();

    
  }


  getListConductores(){
    this.conductorService.getConductores().subscribe(conductores => {
    this.conductores = conductores;
    });
  }


 onDeleteConductor(idConductor: string): void{
    
    const confirmacion = confirm('¿Está seguro de Eliminar este registro?')
    if(confirmacion){
       this.conductorService.deleteConductor(idConductor);
    }
    else{ }
   
  }

    
  onUpdateConductor(conductor: ConductorInterface){

    
    this.conductorService.selectedConductor = Object.assign({},conductor);
    const dialogConfig = {};
    const dialogRef = this.editarConductor.open(EditarConductorComponent,{panelClass: 'custom-dialog-container'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
    
    

  }

 
  onCreateConductor(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.nuevoConductor.open(ConductoresComponent,{panelClass: 'custom-dialog-container'});
  }


}
