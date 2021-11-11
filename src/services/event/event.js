import moment from 'moment';
// Event entity
import {fileUpload, dataUri, makeResponse, deleteUpload} from '../../modules/image-upload'

export function makeAddEvent({ mockShopDb, userDB }) {
  return async function addEvent(req, { event, userId }) {
    // insert the new Event to the database
    event = JSON.parse(event)
    event.private = event.private ? event.private : false,
    console.log(event)
    if (!event.name) {
     throw new Error("you must provide name")
    }
    if (!event.description) {
      throw new Error("you must provide description")
     }
     if (!event.category) {
      throw new Error("you must provide category")
     }
     if (event.paid == true) {
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

     if (!userId) {
      throw new Error("you must provide userId")
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
     if (new Date() > event.date) {
       throw new Error("You can not create an event in the past")
     }
     event.userId = userId
     event.email = (await userDB.findById(userId)).email
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
    const deleted = await mockShopDb.remove({id});
    return { deleted, id };
  };
}


export function makeEditEvent({ mockShopDb, eventAttendanceDb }) {
  return async function editEvent(req, { id, event }) {
    const updatedInfo = JSON.parse(event)
    if (!id) {
      throw new Error(
        'you must provide the Event is of which you want to edit',
      );
    }
    const existing = await mockShopDb.findById(id);
    if (!existing) {
      throw new Error('the Event you want to edit does not exist');
    }
    const eventAtten =await eventAttendanceDb.find({ eventId: id })
    if (eventAtten.length > 0) {
      throw new Error("This Event can no longer be edited")
    }

    if (req && req.file) {
      const file = dataUri(req);
      // SAVES IMAGE TO CLOUDINARY
      const res = await fileUpload(file);

      if (!res) {
        throw new Error("Imge not uploaded")
      }
      // delete prev borrower image
      updatedInfo.image = res.secure_url || res.url;
    }

    deleteUpload(existing.image)
    
    updatedInfo.date = updatedInfo.date ? new Date(updatedInfo.date) : existing.date
   
    const updated = await mockShopDb.update({
      id,
      ...existing,
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
      event.editable = eventAtten.length == 0
      result.push(event)
    }
    return result
    }
    const event = await mockShopDb.findById(id)
    if (!event) {
      throw new Error("Event not found")
    }
    const eventAtten =await eventAttendanceDb.find({ eventId: event.id })
    event.eventAttendance = eventAtten
    event.completed = new Date() >  moment(new Date(event.date)).add(1, 'h').toDate()
    event.editable = eventAtten.length == 0
    return event;
  };
}

export function makeGetActiveEvent({ mockShopDb, eventAttendanceDb }) {
  return async function getEvent(data) {
      const events = await mockShopDb.find({...data, date: {
        $gte: new Date(new Date().setHours(0)),
        $lt: new Date(new Date().setHours(23))
    }});      
      const result = []
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventAtten = await  eventAttendanceDb.find({ eventId: event.id })
      event.eventAttendance = eventAtten
      event.editable = eventAtten.length == 0
      result.push(event)
    }
    return result
  };
}

export function makeGetScheduledEvent({ mockShopDb, eventAttendanceDb }) {
  return async function getEvent({ userId}) {
      const events = await mockShopDb.find({userId, date: { $gt: new Date() } });      
      const result = []
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventAtten = await  eventAttendanceDb.find({ eventId: event.id })
      event.eventAttendance = eventAtten
      event.editable = eventAtten.length == 0
      result.push(event)
    }
    return result
   
  };
}

export function makeGetCompletedEvent({ mockShopDb, eventAttendanceDb }) {
  return async function getEvent({ userId}) {
      const events = await mockShopDb.find({userId, date: { $lt: new Date() } });      
      const result = []
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventAtten = await  eventAttendanceDb.find({ eventId: event.id })
      event.eventAttendance = eventAtten
      event.editable = eventAtten.length == 0
      result.push(event)
    }
    return result
   
  };
}


export function makeGetPaidEvent({ mockShopDb, eventAttendanceDb, userDB, appWalletDB }) {
  return async function getEvent({ userId }) {
      const user = await userDB.findById(userId)
      if (!user) {
        throw new Error("user does not exist")
      }
      if (user.email === 'appiplace.help@gmail.com') {
        // TODO: fetch Withdraw 
        const [currentWallet] =  await appWalletDB.find({})
        if (currentWallet == undefined) {
          return []
        }
        if (currentWallet.balance < 200) {
          return []
        }
        return [{
          image: 'data:image/png;base64,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',
          name: 'Payout',
          description: '',
          venue: '',
          paid: true,
          date: new Date(),
          Summary: {
            totalRegistered: 0,
            totalPrice: currentWallet.balance
          }
        }]
      }
      const events = await mockShopDb.find({userId, paid: true});      
      const result = []
      const paymentSuccessStatus = 'SUCCESS' //TODO: 'SUCCESS'
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
