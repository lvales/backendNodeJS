export class CreateUserDto{
   constructor(user){
      this.name = user.first_name + ' ' + user.last_name;
      this.email = user.email;
      this.rol = user.rol;
   }
}
