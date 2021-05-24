import Model from '../models/model';

const userModel = new Model('User');

export const addNewUser = async (req, res) => {
  const {name, password, email, created_at} = req.body;
  const columns = 'name, password, email, created_at';
  const values = `'${name}', '${password}', '${email}', '${created_at}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};