export interface Roles {
    admin?: boolean;
    invitado?: boolean;
}


export interface UsuarioInterface {

    id?: string;
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    photoURL?:string;
    roles: Roles;
    
}
