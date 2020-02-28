export default function buildMakeUser({ encryptPassword, validatePassword }) {
  return function makeUser({
    id,
    firstName,
    lastName,
    email,
    password,
    isAdmin = false,
  } = {}) {
    if (!firstName) {
      throw new Error('user must have a firtsName');
    }
    if (!lastName) {
      throw new Error('user must have a lastName');
    }
    if (!email) {
      throw new Error('user must have an email');
    }
    if (!password) {
      throw new Error('user must have  a password');
    }

    // the setter and getters
    return Object.freeze({
      getId: () => id,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmail: () => email,
      getPassword: () => encryptPassword(passwords),
      validPassword: (_password) => validatePassword(_password, password),
      getRole: () => isAdmin,
    });
  };
}
