
export function makeRegisterEvent({ mockShopDb, eventDb }) {
  return async function registerEvent({ eventId, ...data }) {
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
