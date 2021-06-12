// the product router
import { Router } from 'express';
const router = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import Controller from '../controllers/event';
const { getEvent, addEvent, patchEvent, deleteEvent, eventReg, getEventReg } = Controller;
// auth middleware
import {  authMiddleware } from '../middlewares';

// the endpoints
// thw root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'this is product service' },
  });
});
// the get product endpoint
router.get('/get-event', authMiddleware, makeCallBack(getEvent));
// the add Event endpoint
router.post(
  '/add-event',
  authMiddleware,
  makeCallBack(addEvent),
);
// the patch Event endpoint
router.put(
  '/edit-event/:id',
  authMiddleware,
  makeCallBack(patchEvent),
);
// the delete Event endpoint
router.delete(
  '/delete-event/:id',
  authMiddleware,
  makeCallBack(deleteEvent),
);

router.post(
  '/reg-event',
  makeCallBack(eventReg),
);

router.get(
  '/get-event-reg/:id',
  authMiddleware,
  makeCallBack(getEventReg),
);

export default router;
