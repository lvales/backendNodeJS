import TicketDao from '../dao/manager/mongoDb/TicketDao.js';

const ticketDao = new TicketDao;

class TicketController {

   createTicket = async (req, res) => {
      const ticket = req.body;
      const result = await ticketDao.createTicket(ticket);

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