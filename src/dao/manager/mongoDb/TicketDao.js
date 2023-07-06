import TicketModel from '../../models/ticket.model.js ';


export default class MessageDao {

   createTicket = async (ticket) => {
      try {
         const result = await TicketModel.create(ticket);
         return result;
      } catch (error) {
         console.log(error);
         return { status: false };
      }
   }

}