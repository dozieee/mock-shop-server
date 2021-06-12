// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'Event' });
const eventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
// services
import { makeAddEvent, makeDeleteEvent, makeEditEvent, makeGetEvent } from './event';

// build the services by passing the db interface to it
const addEvent = makeAddEvent({ mockShopDb });
const deleteEvent = makeDeleteEvent({ mockShopDb });
const editEvent = makeEditEvent({ mockShopDb });
const getEvent = makeGetEvent({ mockShopDb, eventAttendanceDb });

// the Service object
const productService = Object.freeze({
  addEvent,
  deleteEvent,
  editEvent,
  getEvent
});
// export
export default productService;
