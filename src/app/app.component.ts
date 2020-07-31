import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig , MatIcon} from '@angular/material';
import { DialogLoginComponent } from './componentes/dialog-login/dialog-login.component';
import { registerContentQuery } from '@angular/core/src/render3/instructions';
import { ListaPasajerosComponent } from './componentes/reservas/lista-pasajeros/lista-pasajeros.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Transport Service';
    mobileQuery: MediaQueryList;
    isAuthenticated:boolean = false;
    dataUser:any = {};
    data = null;
    //data:any = [{id: 1,titulo: 'Imagen 1'},{id: 2,titulo: 'Imagen 2'},{id: 3,titulo: 'Imagen 3'}];

    

    
    fillerNav =[
        {name:"Vehiculos", route:"listaVehiculos",icon:"local_taxi"},
        {name:"Conductores", route:"listaConductores",icon:"airline_seat_recline_extra"},
        {name:"Viajes", route:"nuevaSalida",icon:"commute"},
        {name:"Proximas Salidas", route:"listaSalidas",icon:"departure_board"},
        {name:"Listados de Pasajeros", route:"listaPasajeros",icon:"people_alt"},
        
    ]

    
    constructor(private authentication:AuthenticationService, private router:Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
        this.mobileQuery = media.matchMedia('(max-width: 400px),(max-height: 300px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    public isAdmin: any = null;
    public userUid: string = null;

    private _mobileQueryListener: () => void;

    ngOnInit(): void {
        
        this.authentication.isAuthenticated().subscribe((result) => {
            if (result && result.uid) {
                
                this.authentication.getDataUserGeneral(result.uid).valueChanges().subscribe(user => {
                    this.dataUser = user;
                    this.authentication.setDataUser(user);
                    this.isAuthenticated = true;
                    this.dialog.closeAll();
                    this.router.navigate(['/listaSalidas']);
                    this.getCurrentUser();
                });

            }else{
                this.isAuthenticated = false;
                this.dataUser = {};
                this.router.navigate(['/']);
                this.openModalLogin();
            }
        }, (error) => {
            this.isAuthenticated = false;
            this.dataUser = {};
            this.router.navigate(['/']);
            this.openModalLogin();
        });


       
    }

    // PARA VERIFICAR SI ES ADMIN DESPUES DE AUTENTICADO

  getCurrentUser(){
    this.authentication.isAuthenticated().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authentication.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }

      //console.log("ID USER",auth.uid);
      localStorage.setItem("idUsuario", auth.uid); //donde necesitas agregar ese dato, indicame el modal..OK
    })
  }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    openModalLogin() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        const dialogRef = this.dialog.open(DialogLoginComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('El modal de login se cerro con exito.');
        });
    }

    public signOut(){
        this.authentication.signOut();
        this.isAuthenticated = false;
        this.dataUser = {};
        this.openModalLogin();
        this.router.navigate(['/']);
    }

    public manageRoutes(pos){
        switch(pos) {
            case 1:
                this.router.navigate(['/']);
                break;
            case 2:
                    this.router.navigate(['/perfilUsuario']);
                    break;
                    /*
            case 3:
                    this.router.navigate(['/listaPasajeros']);
                    break;
                    */
            default:
                this.router.navigate(['/']);
        }
    }

    shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}

