import MessageModel from '../../models/message.model.js ';

export default class MessageDao {

   // Metodos
   // Obtener todos los mensajes
   getMessages = async () => {
      try {
         const result = await MessageModel.find().lean();
         return result
      } catch (error) {
         console.log(error);
      }
   }

   // Obtener un mensaje por id
   createMessage = async (msg) => {
      const { user, message } = msg;

      if (!user || !message) return { incomplite: true }
      
      const newMessage = {
         user,
         message
      }
      try {
         const result = await MessageModel.create(newMessage);
      } catch (error) {
         console.log(error);
      }
   }
}
