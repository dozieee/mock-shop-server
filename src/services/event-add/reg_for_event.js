
export function makeRegisterEvent({ mockShopDb, eventDb }) {
  return async function registerEvent({ eventId, ...data }) {
    //* the id refers to the id of the product to be added to the cart
    //* the userId refers to the id of the currently signed in user try to add a product to his/her cart
    if (!eventId) {
      throw new Error(
        'you must provide the is of the event Id (eventId)',
      );
    }

    if (!data.firstName) {
      throw new Error("you must provide firstName") 
     }
     if (!data.lastName) {
      throw new Error("you must provide lastName") 
     }
     if (!data.email) {
      throw new Error("you must provide email") 
     }
     if (!data.number_of_ticket) {
      throw new Error("you must provide number_of_ticket") 
     }
     if (!data.ticket_type) {
      throw new Error("you must provide ticket_type") 

     }
     
    const event  = await eventDb.findById(eventId)
    let found = false

    if (!event) {
      throw new Error("event does not exist")
    }
    let price = 0
    if (event.paid) {
      const ticket_type = event.ticket_type
      for (let i = 0; i < ticket_type.length; i++) {
        const element = ticket_type[i];
        if (element.ticket_name === data.ticket_type) {
          price = +element.ticket_price
          found = true
          break
        } 
      }
    }

    if (!found) {
      throw new Error(`${data.ticket_type} is not a valid Ticket Type`)
    }

    price *= +data.number_of_ticket
    
    const addEventAttend = await mockShopDb.insert({
      eventId,
      ...data,
      reg_date: new Date(),
      status: 'PENDING',
      claimed: false,
      creatorId: event.userId,
      paid: event.paid,
      metaDate: {
        price
      }
    });

    // TODO: create a flutterware transaction
    const public_key = process.env.WAVE_PUBLICK_KEY
    const transaction = {
      public_key,
      tx_ref: addEventAttend.id,
      amount: price * 100,
      currency: "NGN",
      country: "NG",
      customer: {
        email: data.email,
        phone_number: data.phone_number,
        name: `${data.firstName} ${data.lastName}`,
      },
    }
    return { addEventAttend, transaction: event.paid ? transaction : null };
  };
}



export function makeGetEventAttEvent({ mockShopDb }) {
  return async function getEventAtt({ eventId }) {
    //* the id refers to the id of the product to be added to the cart
    //* the userId refers to the id of the currently signed in user try to add a product to his/her cart
    if (!eventId) {
      throw new Error(
        'you must provide the is of the event Id (eventId)',
      );
    }

    const event  = await eventDb.findById(eventId)

    if (!event) {
      throw new Error("event does not exist")
    }
    
    const eventAtten = mockShopDb.find({ eventId })
    return eventAtten;
  };
}
