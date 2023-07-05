

export class GetUser {
      constructor(first_name, last_name, email, cartId, createdAt) {
         this.first_name = first_name;
         this.last_name = last_name;
         this.email = email;
         this.cartId = cartId;
         this.createdAt = createdAt;
      }
   }

   en session.routes.js 
router.get("/current", userController.current);




y el controller 
current = (req, res) => {
    let { first_name, last_name, email, age } = req.session.user;
    const user = new CreateUserDto({ first_name, last_name, email, age });
    res.send({ status: "success", payload: user });
  };