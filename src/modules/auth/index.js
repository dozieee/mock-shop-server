import { sign, verify } from 'jsonwebtoken';

/**
 *
 * @param {Object} payload
 * @returns {Object} { token, expiresIn, user }
 *
 * token => this the jwt BEARER TOKEN
 * expiresIn => this the expiry time of the token, where 1 === one hour
 * user => the user data send to the client
 */
export function generateToken({ payload }) {
  let token;
  try {
    token = sign({ data: payload }, process.env.DM_JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  } catch (error) {
    throw new Error("Couldn't generate token");
  }
}
export function verifyToken({ token }) {
  let decodedToken;
  try {
    decodedToken = verify(token, process.env.DM_JWT_SECRET);
    if (!decodedToken) {
      throw new Error("Couldn't verify the token");
    }
    return decodedToken;
  } catch (error) {
    //   TODO: implement logging
    throw new Error("Couldn't verify the token");
  }
}
