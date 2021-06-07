import Model from '../models/model';
import { getUpperAndLowerLimitNews} from '../middleware';

const newsModel = new Model('News');
const zero = 0
const nullValue = null

export const addPieceNews = async (req, res) => {
  console.log("9: addPieceNews")

  const {title, content, fullContent, source, axis_primary, axis_secondary, 
        country, date, slug} = req.body;
  
  console.log(req.body)
  
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const created_at = today.toLocaleDateString(); // "6/14/2020"
  const columns = 'title, content_summary, link, source, axis_primary, axis_secondary, country, bibliography, rating_relevance, rating_relevance_accum, rating_irrelevance, rating_irrelevance_accum, authors, author_count, created_at, date, voter_count_relevance, voter_count_irrelevance, slug';
  const values = `'${title}', '${content}','${fullContent}', '${source}'
            '${axis_primary}', '${axis_secondary}', '${country}', '${nullValue}','${zero}'
            '${zero}', '${zero}', '${zero}', '${nullValue}', '${zero}',
            '${created_at}', '${date}', '${zero}','${zero}', '${slug}'`;
  try {
    const data = await newsModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const putPieceNewsRelevance = async (req, res) => {
    const {rating_relevance, rating_relevance_accum, voter_count_relevance} = req.body;    
    const {slug} = req.body;    
    const columns = 'rating_relevance, rating_relevance_accum, voter_count_relevance';
    const values = `'${rating_relevance}', '${rating_relevance_accum}', '${voter_count_relevance}'`;
    
    const conditions = `WHERE slug = ${slug}`
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
    const values = `'${rating_irrelevance}', '${rating_irrelevance_accum}', '${voter_count_irrelevance}'`;
    
    const conditions = `WHERE slug = ${slug}`
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
    const values = `'${bibliography}', '${authors}', '${author_count}', '${tags}'`;
    
    const conditions = `WHERE slug = ${slug}`
    try {
      const data = await newsModel.update(columns, values, conditions);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};

export const getBatchNews = async (req, res) => {
  const {page, newsPerPage} = req.body;
  try {
    const data = await newsModel.selectAll(false);

    //Sub-arreglo de noticias (json) dependiendo de la pagina y el numero de noticias por pagina a mostrar
    let actualNews = getUpperAndLowerLimitNews(data,page,newsPerPage)

    res.status(200).json({ news: actualNews });
  } catch (err) {
    res.status(200).json({ news: err.stack });
  }
};