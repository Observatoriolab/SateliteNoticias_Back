import Model from '../models/model';
import { getUpperAndLowerLimitNews} from '../middleware';
var hstore = require('pg-hstore')();

const newsModel = new Model('News');
const zero = 0
const nullValue = null

export const addPieceNews = async (req, res) => {
  console.log("9: addPieceNews")

  let {title, content_summary, link, source, axis_primary, axis_secondary, 
        country, date, slug, type} = req.body;
  
  console.log(req.body)
  // string.replace()-> title
  title = title.replace(/['‘]+/g, '')
  title = title.replace(/['’]+/g, '')
  content_summary= content_summary.replace(/['‘]+/g, '')
  content_summary= content_summary.replace(/['’]+/g, '')

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const created_at = today.toLocaleDateString(); // "6/14/2020"
  const columns = 'title, content_summary, link, source, axis_primary, axis_secondary, country, bibliography, rating_relevance, rating_relevance_accum, rating_irrelevance, rating_irrelevance_accum, authors, author_count, created_at, date, voter_count_relevance, voter_count_irrelevance, slug, type';
  const values = `'${title}', '${content_summary}','${link}', '${source}',
            '${axis_primary}', '${axis_secondary}', '${country}', ${nullValue},${zero},
            ${zero}, ${zero}, ${zero}, ${nullValue}, ${zero},
            '${created_at}', '${date}', ${zero},${zero}, '${slug}', '${type}'`;
  try {
    const data = await newsModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    console.log("linea 34")
    console.log(err)
    res.status(400).json({ messages: err.stack });
  }
};

export const putPieceNewsRelevance = async (req, res) => {
    const {rating_relevance, rating_relevance_accum, voter_count_relevance} = req.body;    
    const {slug} = req.body;    
    const columns = 'rating_relevance, rating_relevance_accum, voter_count_relevance';
    const values = `${rating_relevance}, ${rating_relevance_accum}, ${voter_count_relevance}`;
    
    const conditions = `WHERE slug = '${slug}'`
    try {
      const data = await newsModel.update(columns, values, conditions);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};
export const putPieceNewsIrrelevance = async (req, res) => {
    const {rating_irrelevance, rating_irrelevance_accum, voter_count_irrelevance} = req.body;    
    const {slug} = req.body;    
    const columns = 'rating_irrelevance, rating_irrelevance_accum, voter_count_irrelevance';
    const values = `${rating_irrelevance}, ${rating_irrelevance_accum}, ${voter_count_irrelevance}`;
    
    const conditions = `WHERE slug = '${slug}'`
    try {
      const data = await newsModel.update(columns, values, conditions);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};

export const putPieceNewsMetadata = async (req, res) => {
    const {bibliography, authors, author_count, tags} = req.body;    
    const {slug} = req.body;    
    const columns = 'bibliography, authors, author_count, tags';
    const values = `${bibliography}, ${authors}, ${author_count}, ${tags}`;
    
    const conditions = `WHERE slug = '${slug}'`
    try {
      const data = await newsModel.update(columns, values, conditions);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};

export const getBatchNews = async (req, res) => {
  const {type,newsPerPage} = req.body;
  const {page} = req.params;
  console.log("Linea 86 news.js controller")
  console.log(req.body)
  const whereClause = ` WHERE type = '${type}'`
  try {
    const data = await newsModel.select('*',whereClause);

    //Sub-arreglo de noticias (json) dependiendo de la pagina y el numero de noticias por pagina a mostrar
    let result = getUpperAndLowerLimitNews(data,page,newsPerPage)
    let actualNews = result[0]
    let nextPage = result[1]
    console.log("Linea 93 news.js controller")
    console.log(actualNews, nextPage)
    res.status(200).json({ news: actualNews, next: nextPage });
  } catch (err) {
    res.status(200).json({ news: err.stack });
  }
};