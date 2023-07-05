export class CreateUser{
   constructor(user){
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email = user.email;
      this.password = user.password;
      this.age = user.age;
      this.cartId = user.cartId;
      this.rol = user.rol;
   }
}

export class GetUser{
   constructor(userDB){
      this.first_name = userDB.first_name;
      this.last_name = userDB.last_name;
      this.email = userDB.email;
      this.cartId = userDB.cartId;
      this.rol = userDB.rol;
   }
}
