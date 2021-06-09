import cuid, { isCuid } from "cuid";

const Id = Object.freeze({
  makeId: cuid,
  isValidId: isCuid
});

export default Id;
