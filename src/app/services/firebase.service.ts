import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db:AngularFireDatabase, private storage:AngularFireStorage, private router:Router) { }

    // Metodo para obtener todas las publicaciones de un usuario
    public getPostsUser(id = 0){
        return this.db.list('datos/publicaciones/', ref => ref.orderByChild('id_usuario').equalTo(id)).valueChanges();
    }

    // Metodo para obtener una sola publicación
    public getPost(id){
        return this.db.object('datos/publicaciones/'+id);
    }

    // Metodo crear una publicación
    public createPost(dataForm, eventImage){
        const file = eventImage.target.files[0];
        const filePath = 'images/'+dataForm.id;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);

        task.snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                    dataForm.image = url;
                    this.db.database.ref('datos/publicaciones/'+dataForm.id).set(dataForm);
                    this.router.navigate(['/listpost']);
                })
            })
        ).subscribe();
    }

    // Metodo para eliminar una publicación
    public deletePost(id){
        this.db.object('datos/publicaciones/'+id).remove();
        this.storage.ref('images/'+id).delete();
    }
}
