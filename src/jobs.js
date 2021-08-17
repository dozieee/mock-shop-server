import cron from 'node-cron'
import { sendNotification } from './modules/notify/send-mail'
import eventService from './services/event'
import makeMockShop from './data-access';
const EventDB = makeMockShop({ modelName: 'Event' });
const eventAttendanceDb = makeMockShop({ modelName: 'EventAttendance' });
const { getActiveEvent } = eventService






export function SetUPjob() {
    // run this once a day
    cron.schedule('59 * * * *', async() => {
        console.log('running 1hr task');
        const events = await getActiveEvent({})
        events.forEach((event) => {
            const eventAttendance = event.eventAttendance
            eventAttendance.forEach(eventAttendance => {
                console.log(eventAttendance)
                const evt = eventAttendance.metaDate.event
                sendNotification({ event: "EVENT_REMINDER", data: { email: event.email, name: data.firstName, event: { id: eventAttendance.id, event_name: evt.event_name, description: evt.description, category: evt.category, paid: eventAttendance.paid, venue: evt.venue, date: event.date, ticket_name: eventAttendance.ticket_type || 'Free', ticket_price:  `N${eventAttendance.metaDate.price}` || 'Free', ticket_count: evt.ticket_count}} })
            })
        })
    });

    // 
    cron.schedule('30 * * * *', async() => {
        console.log('running 30min task');
        const events = await EventDB.find({date: {
            $gte: new Date(),
            $lt: new Date(new Date().setMinutes(40))
        }})
        for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const eventAttendance = await  eventAttendanceDb.find({ eventId: event.id })
        eventAttendance.forEach(eventAttendance => {
            console.log(eventAttendance)
            const evt = eventAttendance.metaDate.event
            sendNotification({ event: "EVENT_REMINDER", data: { email: event.email, name: data.firstName, event: { id: eventAttendance.id, event_name: evt.event_name, description: evt.description, category: evt.category, paid: eventAttendance.paid, venue: evt.venue, date: event.date, ticket_name: eventAttendance.ticket_type || 'Free', ticket_price:  `N${eventAttendance.metaDate.price}` || 'Free', ticket_count: evt.ticket_count}} })
        })
        }
    });
}

