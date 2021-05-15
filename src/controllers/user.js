import Model from '../models/model';

const userModel = new Model('User');

export const addNewUser = async (req, res) => {
  const {title, content_summary, content_full, source, axis_primary, axis_secondary, 
        country, bibliography, rating_relevance, rating_relevance_accum, rating_irrelevance, rating_irrelevance_accum,
        authors, author_count, created_at, date, voter_count, slug} = req.body;
  const columns = 'title, content_summary, content_full, source, axis_primary, axis_secondary, country, bibliography, rating_relevance, rating_relevance_accum, rating_irrelevance, rating_irrelevance_accum, authors, author_count, created_at, date, voter_count, slug';
  const values = `'${title}', '${content_summary}', '${content_summary}', '${content_full}', '${source}'
                '${axis_primary}', '${axis_secondary}', '${country}', '${bibliography}', '${rating_relevance}'
                '${rating_relevance_accum}', '${rating_irrelevance}', '${rating_irrelevance_accum}', '${authors}', '${author_count}'
                '${created_at}', '${date}', '${voter_count}', '${slug}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

