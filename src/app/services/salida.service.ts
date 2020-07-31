import { Injectable } from '@angular/core';
import { VehiculoService} from '../services/vehiculo.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NotificacionService} from '../services/notificacion.service';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { SalidaInterface } from '../modelos/salida';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  
  array: number[];

  constructor(private afs: AngularFirestore, 
    private notificacionService: NotificacionService) { 

      this.salidasCollection = afs.collection<SalidaInterface>('salidas',ref => ref.orderBy('fecha', 'desc'))
      this.salidas = this.salidasCollection.valueChanges();


  }

  private salidasCollection: AngularFirestoreCollection<SalidaInterface>;
  private salidas: Observable<SalidaInterface[]>;
  private salidaDoc: AngularFirestoreDocument<SalidaInterface>;
  private salida: Observable<SalidaInterface>;

  public selectedSalida: SalidaInterface = {id: null, vehiculo: null}

// METODOS CRUD SALIDAS


getSalidas(){
  return this.salidas = this.salidasCollection.snapshotChanges()
  .pipe(map (changes => {
    return changes.map(action => {
      const data = action.payload.doc.data() as SalidaInterface;
      data.id = action.payload.doc.id;
      return data;
    });
  }));
}

getOneSalida(idSalida: string){
  this.salidaDoc = this.afs.doc<SalidaInterface>(`salidas/${idSalida}`);
  return this.salida = this.salidaDoc.snapshotChanges().pipe(map(action=>{
    if(action.payload.exists == false){
      return null;
    }else{
      const data = action.payload.data() as SalidaInterface;
      data.id = action.payload.id;
      return data;
    }
  }));

}


  // CREATE SALIDA

  addSalida(salida: SalidaInterface): void{
    
    this.salidasCollection.add(salida);
    this.notificacionService.exitoso("Agregado Exitosamente");
  
  }

    // UPDATE SALIDA

    updateSalida(salida: SalidaInterface){
      let idSalida = salida.id;
      this.salidaDoc = this.afs.doc<SalidaInterface>(`salidas/${idSalida}`);
      this.salidaDoc.update(salida);
   
    }
  
      // DELETE SALIDA
  
      deleteSalida(idSalida: string): void{
        this.salidaDoc = this.afs.doc<SalidaInterface>(`salidas/${idSalida}`);
        this.salidaDoc.delete();
        this.notificacionService.eliminado(" Eliminado Exitosamente ");
      }
  
























}
