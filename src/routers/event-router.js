// the product router
import { Router } from 'express';
const router = Router();
// the make express callback
import makeCallBack from '../express-callback';
import {multerUploads} from '../modules/image-upload'
// the controllers
import Controller from '../controllers/event';
const { getEvent, getEventV2, addEvent, patchEvent, deleteEvent, eventReg, getEventReg, getPaidEvent, getScheduledEvent, getCompetedEvent, getActiveEvent } = Controller;
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
router.get('/get-scheduled-event', authMiddleware, makeCallBack(getScheduledEvent));
router.get('/get-active-event', authMiddleware, makeCallBack(getActiveEvent));
router.get('/get-completed-event', authMiddleware, makeCallBack(getCompetedEvent));
router.get('/get-paid-event', authMiddleware, makeCallBack(getPaidEvent));
router.get('/get-one-event', makeCallBack(getEventV2));
// the add Event endpoint
router.post(
  '/add-event',
  authMiddleware,
  multerUploads.single('image'),
  makeCallBack(addEvent),
);
// the patch Event endpoint
router.put(
  '/edit-event/:id',
  authMiddleware,
  multerUploads.single('image'),
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

// Resolve account details
router.post('/event-category', makeCallBack(async(req) => {
  try {
    const categoryTicket = [
      "Media and Entertainment",
      "Technology and Science",
      "Religion",
      "Health and Wellness",
      "Business and Professional",
      "Sales and Discount",
      'Others'
    ];
    return res({ status: 'success', data: categoryTicket })
  } catch (error) {
    return res({ status: 'error', data: error.message }, 500)
  }
}));


export default router;
