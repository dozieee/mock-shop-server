import cron from 'node-cron'
import { sendNotification } from './modules/notify/send-mail'
import eventService from './services/event'
import makeMockShop from './data-access';
import moment from 'moment';
const EventDB = makeMockShop({ modelName: 'Event' });
const eventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
const { getActiveEvent } = eventService

export function SetUPjob() {
    cron.schedule('59 * * * * *', async() => {
        console.log('running 1hr task');
        const events = await EventDB.find({date: {
            $gte: new Date(),
            $lt: moment().add(1, 'h').toDate()
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
                sendNotification({ event: "EVENT_REMINDER", data: { email: eventAttendance.email, name: eventAttendance.firstName, event: { id: event.id, email2: event.email, event_name: event.name, description: event.description, category: event.category, paid: event.paid, venue: event.venue, date: event.date.toLocaleString(), ticket_name: eventAttendance.ticket_type || 'Free', ticket_price:  `N${eventAttendance.metaDate.price || 'Free'}` , ticket_count: evt.ticket_count}} })
            } catch (error) {
                console.log(error)
            }
        })
        }
    });
}

