

// MODULOS

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from './material';
import { FormsModule }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule}  from "@angular/forms";
import {CdkTableModule} from '@angular/cdk/table';
//import { MaterialTimestampAdapterModule } from 'material-timestamp-adapter';
import{MatDateFormats, MAT_DATE_FORMATS, NativeDateAdapter, DateAdapter} from '@angular/material';



// FORMATO FECHA

const MY_DATE_FORMATS = {
    parse: {
        dateInput: { day: 'numeric', month: 'numeric', year: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
 };

export class AppDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: Object): string {
        if (displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } else {
            return date.toDateString();
        }
    }
}


// CONFIGURACION CON FIREBASE

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';




//SERVICIOS

import { AuthenticationService } from './services/authentication.service';
import { FirebaseService } from './services/firebase.service';
import { VehiculoService } from './services/vehiculo.service';
import { ConductorService } from './services/conductor.service';
import { SalidaService } from './services/salida.service';
import { ReservaService } from './services/reserva.service';




//COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { DialogLoginComponent } from './componentes/dialog-login/dialog-login.component';
import { ListaConductoresComponent } from './componentes/lista-conductores/lista-conductores.component';
import { RegistrarVehiculoComponent } from './componentes/Vehiculos/registrar-vehiculo/registrar-vehiculo.component';
import { ListaVehiculosComponent } from './componentes/vehiculos/lista-vehiculos/lista-vehiculos.component';
import { SalidaNuevaComponent } from './componentes/Salidas/salida-nueva/salida-nueva.component';
import { SalidasListaComponent } from './componentes/Salidas/salidas-lista/salidas-lista.component';
import { ReservaComponent } from './componentes/reservas/reserva/reserva.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { ListaPasajerosComponent } from './componentes/reservas/lista-pasajeros/lista-pasajeros.component';
import { EditarReservaComponent } from './componentes/reservas/editar-reserva/editar-reserva.component';
import { ConductoresComponent } from './componentes/lista-conductores/conductores/conductores.component';
import { EditarConductorComponent } from './componentes/lista-conductores/editar-conductor/editar-conductor.component';
import { UpdateVehiculoComponent } from './componentes/vehiculos/update-vehiculo/update-vehiculo.component';
// import { UpdateVehiculoComponent } from './componentes/Vehiculos/update-vehiculo/update-vehiculo.component';



//RUTAS ENTRE COMPONENTES


const appRoutes:Routes = [
	{path: '', component: HomeComponent},
    {path: 'registrarVehiculo', component: RegistrarVehiculoComponent},
    {path: 'listaVehiculos', component: ListaVehiculosComponent},
    {path: 'listaConductores', component: ListaConductoresComponent},
    {path: 'nuevaSalida', component: SalidaNuevaComponent},
    {path: 'listaSalidas', component: SalidasListaComponent},
    {path: 'reserva', component: ReservaComponent},
    {path: 'perfilUsuario', component: PerfilUsuarioComponent},
    {path: 'listaPasajeros', component: ListaPasajerosComponent},
    {path: 'conductor', component: ConductoresComponent},

];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DialogLoginComponent,
        RegistrarVehiculoComponent,
        ListaConductoresComponent,
        ListaVehiculosComponent,
        SalidaNuevaComponent,
        SalidasListaComponent,
        ReservaComponent,
        PerfilUsuarioComponent,
        ListaPasajerosComponent,
        EditarReservaComponent,
        ConductoresComponent,
        EditarConductorComponent,
        UpdateVehiculoComponent,
    
        
                
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        CommonModule,
        BootstrapModalModule,
        AngularFontAwesomeModule,
        CdkTableModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        //MaterialTimestampAdapterModule
        

       
    ],

    exports:[RouterModule],
    providers: [AuthenticationService, FirebaseService,VehiculoService,ConductorService,SalidaService,ReservaService,
    AngularFirestore],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogLoginComponent,
        RegistrarVehiculoComponent,
        SalidaNuevaComponent,
        ReservaComponent,
        SalidasListaComponent,
        EditarReservaComponent,
        ConductoresComponent,
        EditarConductorComponent,
        UpdateVehiculoComponent
        

    ]
})
export class AppModule { }
