import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ConductorService } from '../../../services/conductor.service';
import { VehiculoInterface } from '../../../modelos/vehiculo';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';
import { RegistrarVehiculoComponent } from '../../../componentes/Vehiculos/registrar-vehiculo/registrar-vehiculo.component';
import { UpdateVehiculoComponent } from '../update-vehiculo/update-vehiculo.component';
import {ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-lista-vehiculos',
  templateUrl: './lista-vehiculos.component.html',
  styleUrls: ['./lista-vehiculos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaVehiculosComponent implements OnInit {

  constructor(private vehiculoService: VehiculoService,
    private conductorService: ConductorService, private nuevoVehiculo: MatDialog,
    private _editarVehiculo: MatDialog) { }


  private vehiculos: VehiculoInterface[];


  ngOnInit() {

    this.getListVehiculos();

  }


  getListVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
    });
  }

  onDeleteVehiculo(idVehiculo: string): void {

    const confirmacion = confirm('¿Está seguro de Eliminar este registro?')
    if (confirmacion) {
      this.vehiculoService.deleteVehiculo(idVehiculo);
    }
    else { }

  }

  //------------------------------------

  onUpdateVehiculo(vehiculo: VehiculoInterface) {


    this.vehiculoService.selectedVehiculo = Object.assign({},vehiculo);
    const dialogConfig = {};
    const dialogRef = this._editarVehiculo.open(UpdateVehiculoComponent, {
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result ${result}`);
    });



  }


  onCreateVehiculo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.nuevoVehiculo.open(RegistrarVehiculoComponent, {panelClass: 'custom-dialog-container'});
  }













}
