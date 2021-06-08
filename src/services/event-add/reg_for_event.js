
export function makeRegisterEvent({ mockShopDb, eventDb }) {
  return async function registerEvent({ eventId, ...data }) {
    //* the id refers to the id of the product to be added to the cart
    //* the userId refers to the id of the currently signed in user try to add a product to his/her cart
    if (!eventId) {
      throw new Error(
        'you must provide the is of the product you want to add to your cart',
      );
    }

    if (!event.firstName) {
      throw new Error("you must provide firstName") 
     }
     if (!event.lastName) {
      throw new Error("you must provide lastName") 
     }
     if (!event.email) {
      throw new Error("you must provide email") 
     }
     if (!event.email) {
      throw new Error("you must provide email") 
     }
     if (!event.number_of_tiket) {
      throw new Error("you must provide number_of_tiket") 
     }
     if (!event.ticket_type) {
      throw new Error("you must provide ticket_type") 
     }
     
    const event  = await eventDb.findbyId(eventDb)

    if (!event) {
      throw new Error("event does not exist")
    }
    
    const addEventAttend = await mockShopDb.update({
      eventId,
      ...data
    });
    return addEventAttend;
  };
}



export function makeGetEventAttEvent({ mockShopDb }) {
  return async function getEventAtt({ eventId }) {
    //* the id refers to the id of the product to be added to the cart
    //* the userId refers to the id of the currently signed in user try to add a product to his/her cart
    if (!eventId) {
      throw new Error(
        'you must provide the is of the product you want to add to your cart',
      );
    }

    const event  = await eventDb.findbyId(eventDb)

    if (!event) {
      throw new Error("event does not exist")
    }
    
    const eventAtten = mockShopDb.find({ eventId })
    return eventAtten;
  };
}
