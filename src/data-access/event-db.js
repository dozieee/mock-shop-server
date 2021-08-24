import Id from '../modules/id'
export default function buildMakeDb({ makeDb}) {
  return function makeMockShopDb({ modelName }) {
    return Object.freeze({
      find, // fetch data based on given querys
      findAll, // fetch all data
      findByEmail,
      findById, // fetch data by the unque id field
      update, //update the data
      insert, //insert data to the db
      remove, // remove data from the db
      updateMany
    });
    async function find (query = {}) {
      const db = await makeDb();
      const result = await db.collection(modelName).find(query);
      return (await result.toArray()).map(({ _id: id, ...found }) => ({
        id,
        ...found
      }));
    }
    async function findByEmail(email) {
      const db = await makeDb();
      const result = await db.collection(modelName).find({ email });
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      const { _id: id, ...info } = found[0];
      return { id, ...info };
    }
    async function findAll () {
      const db = await makeDb();
      const result = await db.collection(modelName).find({});
      return (await result.toArray()).map(({ _id: id, ...found }) => ({
        id,
        ...found
      }));
    }
    async function findById (_id) {
      const db = await makeDb();
      const result = await db.collection(modelName).find({ _id });
      const found = await result.toArray();
      if (found.length === 0) {
        return null;
      }
      const { _id: id, ...info } = found[0];
      return { id, ...info };
    }

    async function insert ({ id: _id = Id.makeId(), ...commentInfo }) {
      const db = await makeDb();
      const result = await db
        .collection(modelName)
        .insertOne({ _id, ...commentInfo });
      const { _id: id, ...insertedInfo } = result.ops[0];
      return { id, ...insertedInfo };
    }
    async function update ({ id: _id, ...commentInfo }) {
      const db = await makeDb();
      const result = await db
        .collection(modelName)
        .updateOne({ _id }, { $set: { ...commentInfo } });
      return result.modifiedCount > 0 ? { id: _id, ...commentInfo } : null;
    }
    async function updateMany (query, { ...commentInfo }) {
      const db = await makeDb();
      const result = await db
        .collection(modelName)
        .updateMany(query, { $set: { ...commentInfo } });
      return result.modifiedCount > 0 ? { ...commentInfo } : null;
    }
    async function remove ({ id: _id }) {
      const db = await makeDb();
      const result = await db.collection(modelName).deleteOne({ _id })
      return result.deletedCount
    }
  };
}
