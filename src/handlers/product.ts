import { Request, Response} from 'express'
import Product from '../models/Product.model';
import {check, validationResult} from 'express-validator'

export const createProduct = async (req: Request, res: Response) => {

    await check('name').notEmpty().withMessage('El nombre de producto no puede ser nulo').run(req)
    await check("price")
      .notEmpty()
      .withMessage("El precio de producto no puede ser nulo")
      .isNumeric()
      .withMessage("Valor no valido")
      .custom(value => value>0).withMessage('Precio no valido')
      .run(req);

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const product = await Product.create(req.body)
    res.json({data: product});
};
