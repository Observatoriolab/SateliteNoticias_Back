import axios from 'axios';
const slug_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const slug_len = 10
export const modifyMessage = (req, res, next) => {
    console.log(req.body)

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

export const getUpperAndLowerLimitNews = (data, page, newsPerPage) => {
  let rows = data.rows; // [{id, title, content, axis....},{}, ....]
  let totalRows = data.totalRows; // Ej 33 noticias
  let newsPerPageAux = newsPerPage
  let pageAux = page
  let reminder = totalRows % newsPerPageAux
  let numberOfPages = totalRows/newsPerPageAux

  if(remainder !== 0) numberOfPages++
  
  let lowerLimit = (pag-1)* newsPerPageAux
  var upperLimit;
  if(numberOfPages === pageAux){
    upperLimit = reminder + lowerLimit - 1
  }
  else{
    upperLimit = lowerLimit + newsPerPageAux - 1
  }

  let newsBatchResult = rows.slice(lowerLimit,upperLimit)

  return newsBatchResult
};
/*
   

    pag1
    0-9

    pag2
    10-19

    pag3
    20-29

    pag4
    30-32

  */


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