// Event entity

export function makeAddEvent({ mockShopDb }) {
  return async function addEvent(event) {
    // insert the new Event to the database
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


export function makeGetEvent({ mockShopDb }) {
  return async function getEvent({ id }) {
    if (!id ) {
      return mockShopDb.findAll();
    }
    return mockShopDb.findById(id);
  };
}
