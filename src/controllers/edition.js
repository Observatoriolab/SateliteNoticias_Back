import Model from '../models/model';

const editionModel = new Model('Edition');

export const addEdition = async (req, res) => {
    const { content, bibliography, axis_primary, axis_secondary, country, tags } = req.body;
    const columns = 'content, bibliography, axis_primary, axis_secondary, country, tags';
    const values = `'${content}', '${bibliography}','${axis_primary}', '${axis_secondary}','${country}', '${tags}' `;
    try {
      const data = await editionModel.insertWithReturn(columns, values);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  };

export const putEdition = async (req, res) => {
    const {id} = req.body;    
    const { content, bibliography, axis_primary, axis_secondary, country, tags } = req.body;
    const columns = 'content, bibliography, axis_primary, axis_secondary, country, tags';
    const values = `'${content}', '${bibliography}','${axis_primary}', '${axis_secondary}','${country}', '${tags}' `;
    
    
    const conditions = `WHERE id_edition = ${id}`
    try {
      const data = await editionModel.update(columns, values, conditions);
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
};