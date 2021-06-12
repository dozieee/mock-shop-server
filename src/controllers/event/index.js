// the services
import eventService from '../../services/event'; //cart service
import { makeGetEventAttend, makeRegisterEvent_ } from '../../services/event-add'; //cart service
const { addEvent, deleteEvent, editEvent, getEvent } = eventService;

import { makeAddEvent, makeDeleteEvent, makeGetEvent, makePatchEvent, makeEventReg, makeGetEventReg} from './event'

// the controller object
const EventController = Object.freeze({
  addEvent: makeAddEvent({ addEvent }),
  deleteEvent: makeDeleteEvent({ deleteEvent }),
  patchEvent: makePatchEvent({ editEvent }),
  getEvent: makeGetEvent({ getEvent }),
  getEventReg: makeGetEventReg({ getEventReg: makeGetEventAttend }),
  eventReg: makeEventReg({  eventReg: makeRegisterEvent_})
});
// export
export default EventController;