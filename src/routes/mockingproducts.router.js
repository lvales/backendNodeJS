import { Router } from 'express';
import MockingproductsController from '../controllers/mockingproducts.controller.js';

const router = Router();
const mockingproductsController = new MockingproductsController();

router.get('/:qtty', mockingproductsController.generateProducts);

export default router;