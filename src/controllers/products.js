import Models from "../models";


export const createProduct = async (req, res) =>{

  try {
    const{name, category, price, imgURL} = req.body;

    // res.json(req.body.imgURL);  
  
    const newProduct = new Models.Product({ name, category, price, imgURL });
  
    /* res.json(newProduct); */
    
    const productSaved = await newProduct.save();
  
    res.status(201).json(productSaved); 

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

}

export const getProducts =async  (req, res) =>{
  try {
    const product = await Models.Product.findAll({
      attributes: ["id", "name", "category", "price","imgURL"],
      order: [["id", "DESC"]],
    });

     res.json(product)
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export const getProductById = async (req, res) =>{

  const { id } = req.params;

  try {

    const product = await Models.Product.findOne({
      attributes: ["id", "name", "category", "price","imgURL"],
      where: { id },
    });
    res.status(200).json(product)
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}

export const updateProductById = async (req, res) =>{
  const { id } = req.params;
  try {
    const product = await Models.Product.findOne({
      attributes: ["id", "name", "category", "price","imgURL"],
      where: { id },
    });

    product.set(req.body);

    await product.save();

    res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}

export const deleteProductById = async (req, res) =>{
  const { id } = req.params;
  try {
    await Models.Product.destroy({
      where: { id },
    });

    res.status(204).json();

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  
}