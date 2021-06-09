import Model from '../models/model';

const userModel = new Model('User');

export const addNewUser = async (req, res) => {
  console.log("/controller/user.js 6:", req.body)
  const {name, password, email} = req.body;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const created_at = today.toLocaleDateString(); // "6/14/2020"

  const columns = 'name, password, email, created_at';
  const values = `'${name}', '${password}', '${email}', '${created_at}'`;
  try {
    const data = await userModel.insertWithReturn(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const loginUser = async (req, res) => {
  const {name, password, email} = req.body;
  const columns = 'name, password, email';

  let clause = `WHERE name = '${name}' AND email = '${email}' AND password = '${password}'`
  try {
    const data = await userModel.select(columns, clause);
    console.log(data)
    res.status(200).json({messages: data.rows});
    /*
    if(data)
    {
      //res.status(200).json({ confirmation: true });

    }
    else{
      //res.status(400).json({ confirmation: false });

    }
    */
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};