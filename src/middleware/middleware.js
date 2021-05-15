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
export const addRatingRelevance = (req, res, next) => {
  let current_accum_relevance = req.body.rating_relevance_accum;

  let voter_count_relevance = req.body.voter_count_relevance + 1
  let rated_relevance = req.body.rated_relevance;

  let new_accum_relevance = current_accum_relevance+rated_relevance

  let result_relevance = new_accum_relevance/(voter_count_relevance)

  req.body.rating_relevance = `${result_relevance}`;
  req.body.rating_relevance_accum = `${new_accum_relevance}`;
  req.body.voter_count_relevance = `${voter_count_relevance}`;

  next();
};
export const addRatingIrrelevance = (req, res, next) => {
  let current_accum_irrelevance = req.body.rating_irrelevance_accum;

  let voter_count_irrelevance = req.body.voter_count_irrelevance + 1
  let rated_irrelevance = req.body.rated_irrelevance;

  let new_accum_irrelevance = current_accum_irrelevance+rated_irrelevance

  let result_irrelevance = new_accum_irrelevance/(voter_count_irrelevance)

  req.body.rating_irrelevance = `${result_irrelevance}`;
  req.body.rating_irrelevance_accum = `${new_accum_irrelevance}`;
  req.body.voter_count_irrelevance = `${voter_count_irrelevance}`;

  next();
};
export const addAuthorCount = (req, res, next) => {
  let author_count = req.body.author_count + 1;

  req.body.author_count = `${author_count}`;

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