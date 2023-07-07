export default class TicketRepository {
   constructor(dao) {
      this.dao = dao;
   }
   createTicket = async (ticket) => {
      return await this.dao.createTicket(ticket);
   }
}