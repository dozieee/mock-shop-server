// Event entity
import {fileUpload, dataUri, makeResponse} from '../../modules/image-upload'

export function makeAddEvent({ mockShopDb }) {
  return async function addEvent(req, { private: private_ = false,...event}) {
    // insert the new Event to the database
    if (!event.name) {
     throw new Error("you must provide name")
    }
    if (!event.description) {
      throw new Error("you must provide description")
     }
     if (!event.category) {
      throw new Error("you must provide category")
     }
     if (event.paid) {
      if (!event.ticket_type) {
        throw new Error("you must provide ticket_type")
       }
     }else{
       event.ticket_type = []
     }
     if (!event.date) {
      throw new Error("you must provide date")
     }
     if (!event.venue) {
      throw new Error("you must provide venue")
     }

     if (!event.userId) {
      throw new Error("you must provide userId")
     }
     if (!event.tag) {
      throw new Error("you must provide tag")
     }

     event.image = process.env.DIMAGE

     if (req && req.file) {
      const file = dataUri(req);
      // SAVES IMAGE TO CLOUDINARY
      const res = await fileUpload(file);

      if (!res) {
        throw new Error("Imge not uploaded")
      }
      // delete prev borrower image
      event.image = res.secure_url || res.url;
    }
     event.date = new Date(event.date)
     event.private = private_
    return mockShopDb.insert(event);
  };
}


export function makeDeleteEvent({ mockShopDb }) {
  return async function deleteEvent(id) {
    if (!id) {
      throw new Error(
        'you must provid the Id of the Event you want to delete',
      );
    }
    // destroy the Event with the id
    const deleted = await mockShopDb.remove(id);
    return { deleted, id };
  };
}


export function makeEditEvent({ mockShopDb }) {
  return async function editEvent({ id, ...updatedInfo }) {
    if (!id) {
      throw new Error(
        'you must provide the Event is of which you want to edit',
      );
    }
    const existing = await mockShopDb.findById(id);
    if (!existing) {
      throw new Error('the Event you want to edit does not exist');
    }
   
    const updated = await mockShopDb.update({
      id,
      ...updatedInfo
    });
    return { updated, id };
  };
}


export function makeGetEvent({ mockShopDb, eventAttendanceDb }) {
  return async function getEvent({ userId, id }) {
    if (!id ) {
      const events = await mockShopDb.find({userId});      
      const result = []
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventAtten =await  eventAttendanceDb.find({ eventId: event.id })
      event.eventAttendance = eventAtten
      result.push(event)
    }
    return result
    }
    const event = await mockShopDb.findById(id)
    if (!event) {
      throw new Error("Event not found")
    }
    const eventAtten =await  eventAttendanceDb.find({ eventId: event.id })
    event.eventAttendance = eventAtten
    return event;
  };
}


export function makeGetPaidEvent({ mockShopDb, eventAttendanceDb }) {
  return async function getEvent({ userId }) {
      const events = await mockShopDb.find({userId, paid: true});      
      const result = []
      const paymentSuccessStatus = 'PENDING' //TODO: 'SUCCESS'
    for (let i = 0; i < events.length; i++) {
      let totalPrice = 0
      const event = events[i];
      const eventAtten = await  eventAttendanceDb.find({ eventId: event.id, claimed: false, paid: true, status: paymentSuccessStatus})
      eventAtten.forEach(element => {
        if (element) {
          totalPrice += element.metaDate.price
        }
      });
      event.Summary = {
        totalRegistered: eventAtten.length,
        totalPrice
      }
      if (totalPrice > 0) {
        result.push(event)
      }
    }
    return result
  };
}
