import { Agenda } from "agenda/es";
import { sendNotification } from './modules/notify/send-mail'
import eventService from './services/event'
import makeMockShop from './data-access';
import moment from 'moment';
import moment from 'moment-timezone';
const EventDB = makeMockShop({ modelName: 'Event' });
const eventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
const { getActiveEvent } = eventService

const mongoConnectionString = process.env.DM_COMMENTS_DB_URL;
const agenda = new Agenda({ db: { address: mongoConnectionString } });


export function  SetUPjob() {
    (async function () {
        // IIFE to give access to async/await
        await agenda.start();
      
        await agenda.every("6 hours", "Reminder1");
      })();
}


agenda.define("Reminder1", async() => {
    console.log('running 6hr task');
    const events = await EventDB.find({date: {
        $gte: new Date(),
        $lt: moment().add(5, 'h').toDate()
    }})
    console.log(events)
    for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const eventAttendance = await  eventAttendanceDb.find({ eventId: event.id })
    eventAttendance.forEach(eventAttendance => {
        console.log(eventAttendance)
        if (eventAttendance.paid && eventAttendance.status == 'PENDING') {
            return
        }
        const evt = eventAttendance.metaDate.event
        try {
            sendNotification({ event: "EVENT_REMINDER", data: { email: eventAttendance.email, name: eventAttendance.firstName, event: { id: event.id, email2: event.email, event_name: event.name, description: event.description, category: event.category, paid: event.paid, venue: event.venue, date: moment(event.date).tz('Africa/Lagos').toDate().toDateString(), ticket_name: eventAttendance.ticket_type || 'Free', ticket_price:  `N${eventAttendance.metaDate.price || 'Free'}` , ticket_count: evt.ticket_count}} })
        } catch (error) {
            console.log(error)
        }
    })
    }
});


