export function makeAddEvent({ addEvent }) {
  return async function(httpRequest) {
    try {
      const EventInfo = httpRequest.body;
      const Event = await addEvent({ ...EventInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { status: 'success', data: Event },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}

export function makeDeleteEvent({ deleteEvent }) {
  return async function(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const data = await deleteEvent(id);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: deleted ? 200 : 404,
        body: {
          status: deleted ? 'success' : 'error',
          data: data,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}

export function makeGetEvent({ getEvent }) {
  return async function(httpRequest) {
    try {
      const Event = await getEvent({ ...httpRequest.query });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', data: Event },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}


export function makePatchEvent({ editEvent }) {
  return async function(httpRequest) {
    try {
      const EventInfo = httpRequest.body;
      const { id } = httpRequest.params;
      const updatedEvent = await editEvent({ id, ...EventInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', data: updatedEvent },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode:
          e.message === 'the Event you want to edit does not exist'
            ? 404
            : 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}


export function makeEventReg({ eventReg }) {
  return async function(httpRequest) {
    try {
      const EventInfo = httpRequest.body;
      const Event = await eventReg({ ...EventInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { status: 'success', data: Event },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}

export function makeGetEventReg({ getEventReg }) {
  return async function(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const data = await getEventReg({ eventId: id });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: deleted ? 200 : 404,
        body: {
          status: deleted ? 'success' : 'error',
          data: data,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}
