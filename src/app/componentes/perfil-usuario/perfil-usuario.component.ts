import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UsuarioInterface } from '../../modelos/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private authentication:AuthenticationService) { }

  user: UsuarioInterface;

  public providerId: string = 'null';
  ngOnInit() {
    this.authentication.isAuthenticated().subscribe(user => {
      if(user){
        this.user.nombre = user.displayName;
        this.user.email = user.email;
        this.user.photoURL = user.photoURL;
        this.providerId = user.providerData[0].providerId;
        console.log('USER', this.providerId);
      }
    })
  }

}
