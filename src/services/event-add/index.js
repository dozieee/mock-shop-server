// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'EventAttendance' });
const eventDb = makeMockShop({ modelName: 'Event' });
// services
import {makeRegisterEvent, makeGetEventAttEvent} from './reg_for_event';
// build the services by passing the db interface to it
export const makeRegisterEvent_ = makeRegisterEvent({ mockShopDb, eventDb });
export const makeGetEventAttend = makeGetEventAttEvent({ mockShopDb, eventDb });