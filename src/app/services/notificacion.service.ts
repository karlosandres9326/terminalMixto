import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig} from '@angular/material';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(public snackbar: MatSnackBar ) { }


  exitoso(msg){
    this.config['panelClass']=['notificacion','exitoso'];
    this.snackbar.open(msg,'',this.config);
  }

  config: MatSnackBarConfig ={
    duration: 1000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
   
  }

  eliminado(msg){
    this.config['panelClass']=['notificacion2','eliminado'];
    this.snackbar.open(msg,'',this.config);
  }


}
