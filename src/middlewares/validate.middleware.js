export const ValidateProduct = (req, res, next) => {
   const { title, description, price, code, stock, status, category } = req.body;
   if (!title || !description || !price || !code || stock < 0 || !category) {
      // console.log(title ,description ,price ,code ,stock, category);
      res.status(400).json({ status: "error", message: "Todos los campos son obligatorios" });
   } else {
      next();
   }
}

export const ValidateProductPaginate = (req, res, next) => {
   const limit = req.query.limit;
   const page = req.query.page;
   const query = req.query.query;

   if (isNaN(limit) || isNaN(page) || limit < 1 || page < 1) {
      res.status(400).json({
         status: "ERROR",
         msg: "Limit y page deben ser numericos y mayores a cero"
      });
   } else {
      next();
   }
}

export const ValidateId = (req, res, next) => {
   const pid = req.params.pid;
   const cid = req.params.cid;
   console.log("p: "+pid, "c: " + cid);
   if (pid && pid.trim().length != 24) {
      console.log("solo pid");
      res.status(400).json({
         status: "ERROR",
         msg: "El Id de producto ingresado no es válido"
      });
   } else if (cid && cid.trim().length != 24) {
      console.log("solo cid");
      res.status(400).json({
         status: "ERROR",
         msg: "El Id de producto ingresado no es válido"
      })
   } else {
      next();
   }
}
