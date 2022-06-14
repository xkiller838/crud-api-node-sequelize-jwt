import Models from "../models";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
  try {
    const{firstName, lastName, email, password, rol_id} = req.body;

   const userExist= await Models.User.findOne({attributes: ["email"], where: { email },});

   if(userExist){

     res.json("Este usuario ya esta registrado"); 

   }else{

      const newUser = new Models.User({ firstName, lastName, email, password, rol_id });
    
      const userSaved = await newUser.save();

      const token = jwt.sign({ id: userSaved.id}, "secret", {
         expiresIn: 86400
      })

      res.status(200).json({token}); 
    }

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }
}

export const login = async (req, res) =>{

  const{email, password} = req.body;

  const user = await Models.User.findOne({attributes: ["id","email","password"], where: { email },});

  if(!user) return  res.status(400).json({message: "Este usuario no esta registrado"}); 

  const validatePassword =  user.validPassword(password.toString());

  console.log(validatePassword);

  if(!validatePassword) return res.status(401).json({token: null, message: "Password invalida"}); 

  const token = jwt.sign({id: user.id }, "secret", {
    expiresIn: 86400
  })

  res.json({token}); 

 /*  const{email, password} = req.body;
  const userExist= await Models.User.findOne({attributes: ["email","password"], where: { email },});

  if(!userExist){
    res.status(400).json({message: "Este usuario no esta registrado"}); 
  }else{
   const resul = await Models.User.validPassword(password, userExist.password );
   console.log(resul);
  } */
}