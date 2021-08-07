// the services
import eventService from '../../services/event'; //cart service
import { makeGetEventAttend, makeRegisterEvent_ } from '../../services/event-add'; //cart service
const { addEvent, deleteEvent, editEvent, getEvent, getPaidEvent, getScheduledEvent, getCompetedEvent, getActiveEvent} = eventService;

import { makeAddEvent, makeDeleteEvent, makeGetEventV2, makeGetEvent, makePatchEvent, makeEventReg, makeGetEventReg, makeGetPaidEvent, makeGetScheduledEvent, makeGetCompletedEvent, makeGetActiveEvent} from './event'

// the controller object
const EventController = Object.freeze({
  addEvent: makeAddEvent({ addEvent }),
  deleteEvent: makeDeleteEvent({ deleteEvent }),
  patchEvent: makePatchEvent({ editEvent }),
  getEvent: makeGetEvent({ getEvent }),
  getEventV2: makeGetEventV2({getEvent}),
  getEventReg: makeGetEventReg({ getEventReg: makeGetEventAttend }),
  eventReg: makeEventReg({  eventReg: makeRegisterEvent_}),
  getPaidEvent: makeGetPaidEvent({ getPaidEvent }),
  getScheduledEvent: makeGetScheduledEvent({ getEvent: getScheduledEvent }),
  getCompetedEvent: makeGetCompletedEvent({ getEvent: getCompetedEvent }),
  getActiveEvent: makeGetActiveEvent({ getEvent: getActiveEvent })
});
// export
export default EventController;