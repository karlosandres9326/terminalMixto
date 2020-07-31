import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ReservaInterface } from '../modelos/reserva';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {NotificacionService} from '../services/notificacion.service';
import { MatDialogConfig } from '@angular/material';



@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  nuevaReserva: any;

  constructor(private afs: AngularFirestore, private notificacionService: NotificacionService) {

    this.reservasCollection = afs.collection<ReservaInterface>('reservas', ref => ref.orderBy('fecha', 'desc'))
    this.reservas = this.reservasCollection.valueChanges();

  }

  private reservasCollection: AngularFirestoreCollection<ReservaInterface>;
  private reservas: Observable<ReservaInterface[]>;
  private reservaDoc: AngularFirestoreDocument<ReservaInterface>;
  private reserva: Observable<ReservaInterface>;

  public selectedReserva: ReservaInterface ={
     id: null
  };



  // METODOS CRUD RESERVAS

  getReservas(){
    return this.reservas = this.reservasCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ReservaInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }



  getReservas2(){
    return this.reservas = this.reservasCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ReservaInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  // Este metodo va a la conexion de Reservas y trae la info del id que ingresemos

  getOneReserva(idReserva: string){
    this.reservaDoc = this.afs.doc<ReservaInterface>(`reservas/${idReserva}`);
    return this.reserva = this.reservaDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as ReservaInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  
  
  }

  
  addReserva(reserva: ReservaInterface): void{
    this.reservasCollection.add(reserva);
    this.notificacionService.exitoso(" Agregado Exitosamente ");

  }


  updateReserva(reserva: ReservaInterface){
    let idReserva = reserva.id;
    this.reservaDoc = this.afs.doc<ReservaInterface>(`reservas/${idReserva}`);
    this.reservaDoc.update(reserva);
 
  }

  deleteReserva(idReserva: string): void{
    this.reservaDoc = this.afs.doc<ReservaInterface>(`reservas/${idReserva}`);
    this.reservaDoc.delete();
    this.notificacionService.eliminado(" Eliminado Exitosamente ");
  }



}
