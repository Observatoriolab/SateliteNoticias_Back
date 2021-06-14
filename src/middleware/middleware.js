import axios from 'axios';
const slug_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const slug_len = 10
export const modifyMessage = (req, res, next) => {
    console.log(req.body)

    req.body.message = `SAYS: ${req.body.message}`;
    next();
  };
export const createSlug = (req, res, next) => {
  console.log("11: Middleware")
  console.log(req.body)
  var randomString = '';
  for (var i = 0; i < slug_len; i++) {
    var randomPoz = Math.floor(Math.random() * slug_chars.length);

    randomString += slug_chars.substring(randomPoz,randomPoz+1);
  }
  console.log('18: Slug creado')
  console.log(randomString)

  req.body.slug = `${randomString}`;
  console.log('22: Slug guardado')
  console.log(req.body.slug)

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
  //Verificar paginacion
  console.log("linea 48 getUpperAndLowerLimit funcion ")
  let rows = data.rows; // [{id, title, content, axis....},{}, ....]
  let totalRows = data.rowCount; // Ej 33 noticias
  let newsPerPageAux = newsPerPage
  let pageAux = page
  let reminder = totalRows % newsPerPageAux
  let numberOfPages = totalRows/newsPerPageAux
  console.log("variables iniciales: ")
  console.log(newsPerPageAux)
  console.log(pageAux)
  console.log(reminder)
  console.log(numberOfPages)


  //if(remainder !== 0) numberOfPages++
  console.log("probando linea 62")
  
  let lowerLimit = (pageAux-1)* newsPerPageAux
  console.log("Linea 65 news.js controller")
  console.log(lowerLimit)
  var upperLimit;
  console.log("numero de pagina: ", numberOfPages)
  console.log("pagina actual: ", pageAux)

  if(reminder !== 0){
    upperLimit = reminder + lowerLimit - 1
    console.log("linea 72 ",upperLimit)
  }
  else{
    upperLimit = lowerLimit + newsPerPageAux - 1
    console.log("linea 77 ", upperLimit)
  }

  let newsBatchResult = rows.slice(lowerLimit,upperLimit)
  console.log("Linea 81 ", newsBatchResult)
  console.log(lowerLimit)
  console.log(upperLimit)

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