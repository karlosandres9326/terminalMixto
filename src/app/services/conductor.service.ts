import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ConductorInterface } from '../modelos/conductor';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import {NotificacionService} from '../services/notificacion.service';
import { ImagenInterface } from '../modelos/imagen';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  array: ConductorInterface[];
  nuevaConductor: any;

   // PROPIEDADES DE IMAGEN
   private filePath: any;
   private downloadURL: Observable<string>;
  

  constructor(private afs: AngularFirestore, 
    private notificacionService: NotificacionService,
    private storage: AngularFireStorage) { 

    this.conductoresCollection = afs.collection<ConductorInterface>('conductores')
    this.conductores = this.conductoresCollection.valueChanges();

  }

  private conductoresCollection: AngularFirestoreCollection<ConductorInterface>;
  private conductores: Observable<ConductorInterface[]>;
  private conductorDoc: AngularFirestoreDocument<ConductorInterface>;
  private conductor: Observable<ConductorInterface>;

  // PROPIEDAD PARA SELECCIONAR UN CONDUCTOR

  public selectedConductor: ConductorInterface = {id: null}

 


  // METODOS CRUD CONDUCTORES


  getConductores(){
    return this.conductores = this.conductoresCollection.snapshotChanges()
    .pipe(map (changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ConductorInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }


   
  getOneReserva(idConductor: string){
    this.conductorDoc = this.afs.doc<ConductorInterface>(`conductores/${idConductor}`);
    return this.conductor = this.conductorDoc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as ConductorInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  
  }

  // CREATE CONDUCTOR

  addConductor(conductor: ConductorInterface){
    
    console.log('Conductor Service', conductor );
    
    const conductorObj = {
      
      id: conductor.id,
      cedula: conductor.cedula,
      nombres: conductor.nombres,
      apellidos: conductor.apellidos,
      licencia: conductor.licencia,
      telefono: conductor.telefono,
      direccion: conductor.direccion,
      imageConductor: this.downloadURL,
      fileRef: this.filePath

    };

    if(conductor.id){
      return this.conductoresCollection.doc(conductor.id).update(conductorObj);
    }else{
      return this.conductoresCollection.add(conductorObj);
    }
     

    //
    
   // this.conductoresCollection.add(conductor);
    this.notificacionService.exitoso(" Agregado Exitosamente ");
    
    
  }


  // UPDATE CONDUCTOR

  updateConductor(conductor: ConductorInterface){
    let idConductor = conductor.id;
    this.conductorDoc = this.afs.doc<ConductorInterface>(`conductores/${idConductor}`);
    this.conductorDoc.update(conductor);
 
  }


  // DELETE CONDUCTOR

  deleteConductor(idConductor: string): void{
    this.conductorDoc = this.afs.doc<ConductorInterface>(`conductores/${idConductor}`);
    this.conductorDoc.delete();
    this.notificacionService.eliminado(" Eliminado Exitosamente ");
  }


  // METODO PARA SUBIR IMAGEN CONDUCTOR

  uploadImage(conductor: ConductorInterface, image: ImagenInterface ){
      this.filePath = `imagesConductores/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            console.log('URL IMAGE', urlImage);
            console.log('CONDUCTOR', conductor);
          
            // LLAMADA AL METODO ADD CONDUCTOR

            this.addConductor(conductor)
          });
        })
      ).subscribe();
  }



  public editConductorById(conductor: ConductorInterface, newImage?: ImagenInterface){

    if(newImage){
      this.uploadImage(conductor, newImage);
    }else{
      return this.conductoresCollection.doc(conductor.id).update(conductor);
    }
   
  }


  // PRECARGAR CONDUCTOR

  public preAddConductor(conductor: ConductorInterface, image: ImagenInterface): void{
    this.uploadImage(conductor,image);
  }




  

}
