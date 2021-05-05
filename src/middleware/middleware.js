import axios from 'axios';
const slug_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const slug_len = 10
export const modifyMessage = (req, res, next) => {
    req.body.message = `SAYS: ${req.body.message}`;
    next();
  };
export const createSlug = (req, res, next) => {
  var randomString = '';
  for (var i = 0; i < slug_len; i++) {
    var randomPoz = Math.floor(Math.random() * slug_chars.length);
    randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  req.body.slug = `${randomString}`;

  next();
};
export const performAsyncAction = async (req, res, next) => {
  try {
    await axios.get('https://picsum.photos/id/0/info');
    next();
  } catch (err) {
    next(err);
  }
};