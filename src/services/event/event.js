// Event entity

export function makeAddEvent({ mockShopDb }) {
  return async function addEvent({ private: private_ = false,...event}) {
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
      return events.map(async event => {
        const eventAtten =await  eventAttendanceDb.find({ eventId: event.id })
        event.eventAttendance = eventAtten
        return event
    })

    }
    const event = await mockShopDb.findById(id)
    const eventAtten =await  eventAttendanceDb.find({ eventId: event.id })
    event.eventAttendance = eventAtten
    return event;
  };
}
