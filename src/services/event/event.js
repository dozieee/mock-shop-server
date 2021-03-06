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
        // if (currentWallet.balance < 200) {
        //   return []
        // }
        return [{
          image: 'https://cdn1.vectorstock.com/i/1000x1000/49/25/payout-rubber-stamp-vector-13344925.jpg',
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
