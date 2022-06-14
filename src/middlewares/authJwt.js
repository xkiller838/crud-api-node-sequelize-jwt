import jwt from "jsonwebtoken";
import Models from "../models";

export const verifyToken = async (req, res, next) => {

   try {

      const token = req.headers["x-access-token"];

      if (!token) return res.status(403).json({message: "no ahi token"})
      
      const decoded = jwt.verify(token, "secret")
   
      req.id = decoded.id;
   
      let id = decoded.id;
   
      const user = await Models.User.findOne({attributes: ["id"], where: { id }});
      console.log(user)
   
      if(!user) return res.status(404).json({message: "usuario no definido"})
   
      console.log(decoded)
      next();
      
   } catch (error) {
      return res.status(404).json({message: "usuario no autorizado"})
   }
 
}