import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { auth }  from 'firebase/app';
import { map } from 'rxjs/operators';

// IIMPRTACIONES FIREBASE

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { UsuarioInterface } from '../modelos/usuario';




@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public dataUser:any = {};

    constructor(private db:AngularFireDatabase, private angularFireAuth:AngularFireAuth, private afs: AngularFirestore, 
        private storage:AngularFireStorage, private router:Router) {}

    //------------------------------------------------------------------------------------------


   

    loginEmailUser(email: string, pass: string){  
        return new Promise((resolve, reject) => {
            this.angularFireAuth.auth.signInWithEmailAndPassword(email,pass)
            .then( userData  => {
                resolve(userData);
            },
            err => reject(err));
        }
    )

    }

    public signOut(){
        this.angularFireAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    public registerUser(email: string, password: string){
        return new Promise ((resolve, reject) => {
            this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
            .then( userData => {
                resolve(userData),
                this.updateUserData(userData.user)
            }).catch(err => console.log(reject(err)))
        
        });
    }


    // Metodo para validar si el usuario esta autenticado
    public isAuthenticated(){
        return this.angularFireAuth.authState.pipe(map(auth => auth));
    }

    public logoutUser(){
        return this.angularFireAuth.auth.signOut();
    }


    // ASIGNAR ROL A USUARIO UNA VEZ REGISTRADO

    private updateUserData(user){
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
        const data: UsuarioInterface = {
            id: user.uid,
            email: user.email,
            roles: {
                invitado: true
            }
        }


        return userRef.set(data, {merge: true})
    }

    isUserAdmin(userUid){
        return this.afs.doc<UsuarioInterface>(`usuarios/${userUid}`).valueChanges();
    }






























    // Metodo para iniciar sesion
    public signIn = (dataLogin, dialogRef) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(dataLogin.email, dataLogin.password)
            .then((response) => {
                this.router.navigate(['/listall']);
                dialogRef.close();
            })
            .catch((error) => {
                // console.log(error);
                alert('El usuario no esta registrado.');
            });
    }

    /*
    // Metodo para cerrar sesion
    public signOut(){
        this.angularFireAuth.auth.signOut();
        this.router.navigate(['/']);
    }

    */

    // Metodo para registrar usuario
    public register = (dataRegister,  dialogRef) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(dataRegister.email, dataRegister.password)
            .then((response) => {
                dataRegister.id = response.user.uid;
                
            })
            .catch((error) => {
                console.log(error);
            });
    }


    // Metodo para obtener los datos del usuario
    // public getDataUserSession(){
    //     return this.angularFireAuth.auth;
    // }

    // Metodo para obtener todos los datos de un usuario
    public getDataUserGeneral(id){
        return this.db.object('datos/usuarios/'+id);
    }

    

    public setDataUser(data){
        this.dataUser = data;
    }
    
    public getDataUser() {
        return this.dataUser;
    }


    



}
