import Models from "../models";
import * as bcrypt from 'bcrypt';
import jst from "jsonwebtoken";


export const createUser = async (req, res) =>{

  try {
    const{firstName, lastName, email, password, rol_id} = req.body;

    const newUser = new Models.User({ firstName, lastName, email, password, rol_id });
    
    const userSaved = await newUser.save();
  
    res.status(201).json(userSaved); 

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

}

export const getUsers = async (req, res) =>{
  try {
    const user = await Models.User.findAll({
      attributes: ["id", "firstName", "lastName", "email","password","rol_id"],
      order: [["id", "ASC"]],
    });

    res.json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getUserById = async  (req, res) =>{
  const { id } = req.params;

  try {
    const user = await Models.User.findOne({
      attributes: ["id", "firstName", "lastName", "email","password"],
      where: { id },
    });
    res.status(200).json(user)
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}

/**
 * This function updates a user's information in the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
export const updateUserById = async (req, res) =>{
  const { id } = req.params;
  try {
    const user = await Models.User.findOne({
      attributes: ["id", "firstName", "lastName", "email","password"],
      where: { id },
    });
    user.set(req.body);

    await user.save();

    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteUserById = async (req, res) =>{
  const { id } = req.params;
  try {
    await Models.User.destroy({
      where: { id },
    });

    res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}