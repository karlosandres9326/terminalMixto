import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {
    login:any = {};
    register:any = {};
    //eventImage:Event = null;

    constructor(public dialogRef: MatDialogRef<DialogLoginComponent>, private authentication:AuthenticationService, 
        private router:Router, private storage: AngularFireStorage) { }


    @ViewChild('imageUser') inputImageUser: ElementRef
    public email: string ='';
    public password: string= '';

    uploadPercent: Observable<number>;
    urlImage: Observable<string>;
    

    ngOnInit() { }

    /*
    selectImage(event){
        this.eventImage = event;
    }

    */

    onLogin(): void {
        this.authentication.loginEmailUser(this.email, this.password)
        .then((res) => {
            //this.router.navigate(['/listall']);
            this.dialogRef.close();
        }).catch((error) => {
            // console.log(error);
            alert('El usuario no esta registrado.');
        });
    }

    onAddUser(){
        this.authentication.registerUser(this.email, this.password)
        .then((res) => {
            this.authentication.isAuthenticated().subscribe( user => {
                if (user){
                    user.updateProfile({
                        displayName: '',
                        photoURL: this.inputImageUser.nativeElement.value
                    }).then( () => {
                        console.log('USUARIO ACTUALIZADO');
                    }).catch( (error) => 
                        console.log('error', error));
                    
                }
            });
            
        }) .catch((error) => {
            console.log(error);
        });

    }

    //---------------------------------------------------------------------

    //Para subir imagen usuario

    onUpload(e){
        //console.log('Subir', e.target.files[0]);
        const id = Math.random().toString(36).substring(2);
        const file = e.target.files[0];
        const filePath = `upload/${id}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();

        task.snapshotChanges().pipe( finalize (() => this.urlImage = ref.getDownloadURL())).subscribe();




    }






    

}







/*
    public signIn(){
        this.authentication.signIn(this.login, this.dialogRef);
    }




    public registerUser(){
        this.register.rol = 2;
        this.authentication.register(this.register, this.dialogRef);
    }

*/

