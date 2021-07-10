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

  try{
    const columns2 = 'email'
    let clause2 = ` WHERE email = '${email}'`
    const data = await userModel.select(columns2,clause2)
    console.log("Linea 19: Existe duplicado ?: ", data)

    if (data.rows.length === 0){
      try {
        const data = await userModel.insertWithReturn(columns, values);
        res.status(200).json({ messages: data.rows, confirmation:false});
        console.log("Linea 25: Se guardo?: ", data)
      } catch (err) {
        res.status(400).json({ messages: err.stack , confirmation: true});
        console.log("Linea 28: Error al guardar usuario")
      }
    }
    else {
      res.status(200).json({confirmation: true})
      console.log("Linea 33: Encontro un duplicado?", data.rows.length )
    }
  }
  catch(err){
    res.status(400).json({ messages: err.stack, confirmation: true });  
    console.log("Linea 38: No se que paso")
  }
  
};

export const loginUser = async (req, res) => {
  console.log('body del login user')
  console.log(req.body)
  const { password, email} = req.body;
  const columns = 'name, password, email';

  let clause = ` WHERE email = '${email}' AND password = '${password}'`
  try {
    const data = await userModel.select(columns, clause);
    console.log("linea 29 user.js controller")
    console.log("-> Esta es la data")
    console.log(data)
    console.log("-> Esta es la data.rows")
    console.log(data.rows)
    console.log("-> Esta es la data.rows[0")
    console.log(data.rows[0])
  
    if(data.rowCount===1)
    {
      console.log("linea 34 user.js controller usuario ingresado correctamente ", email )
      res.status(200).json({ confirmation: true, username: data.rows[0].name});

    }
    else{
      console.log("linea 39 user.js controller usuario ingresado incorrectamente ", email )
      res.status(400).json({ confirmation: false });

    }

  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};