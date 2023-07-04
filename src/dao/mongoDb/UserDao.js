import UserModel from '../models/user.model.js';

export default class UserDao {

   getAllUsers = async () => {  
      try {
         const result = await UserModel.find().lean();
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   getUserById = async (uid) => {
      try {
         const result = await UserModel.findOne({ _id: uid });
         if (!result) return { exists: false };
         return result;
      } catch (error) {
         console.log(error);
      }
   }

   getUserByIdCart = async (cid) => {
      try {
         const user = await UserModel.findOne({ cartId: cid });
         if (!user) return { exists: false };
         return user;
      } catch (error) {
         console.log(error);
      }
   }
}
