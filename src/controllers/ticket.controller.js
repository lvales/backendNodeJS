import { ticketServices } from "../repository/ticket.repository.js";

class TicketController {

   createTicket = async (req, res) => {
      const ticket = req.body;
      const result = await ticketServices.createTicket(ticket);

      if (result.status === false) {
         return res.status(500).send({
            status: 'ERROR',
            msg: 'No se pudo crear el ticket'
         });
      }

      res.send({
         status: 'success',
         result
      });
   }
}

export default TicketController;