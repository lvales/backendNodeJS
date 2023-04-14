import { Router } from "express";

const router = Router();

router.get('/', (req,res) => {
   res.render('home', {
      products: ''
   });
});

export default router;