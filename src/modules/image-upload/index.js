import multer from 'multer';
import Datauri from 'datauri/parser';
import path from 'path';  
import cloudinary from 'cloudinary';

const cloudinaryConfig = () =>
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

export const multerUploads = multer({ storage });

const dUri = new Datauri();


/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
export const dataUri = (req) =>
  dUri.format(path.extname((req).file.originalname).toString(), (req).file.buffer);



  /**
   * @description This function uploads images to cloudinary
   * @param  {object} file The image uri to be uploaded
   * @param  {object} res http response object
   * @param {object} fields The request body
   * @returns {object} returns the response object cloudinary which contains the image url
   */
  export const fileUpload = async (file, options) => {
    try {
      // INITIALIZES CLOUDINARY LOCAL CONFIGURATIONS
      cloudinaryConfig();
      const result = await cloudinary.v2.uploader.upload(file.content, options);
      return makeResponse(result);
    } catch (error) {
      return makeResponse(null, null, error.message);
    }
  };
  
  export const deleteUpload = async (url) => {
    try {
      // INITIALIZES CLOUDINARY LOCAL CONFIGURATIONS
      if (!url) {
        return makeResponse(null, null, 'You must provide the url of the image');
      }
      const tempe = url.split('/');
      const public_id = tempe[tempe.length - 1].split('.')[0];
      cloudinaryConfig();
      const result = await cloudinary.v2.uploader.destroy(public_id);
      return makeResponse({ deleted: result.result == 'ok' || result.result == 'not found' ? true : false });
    } catch (error) {
      return makeResponse(null, null, error.message);
    }
  };






export function  makeResponse(params1, params2, params3) {
    if (params3) {
        throw new Error(params3)
    }
    return params1
}