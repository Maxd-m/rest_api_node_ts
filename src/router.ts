import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// routing
//              request (lo que se pide)
//              response (lo que se obtiene)
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  // validacion
  body("name")
    .notEmpty()
    .withMessage("El nombre de producto no puede ser nulo"),
  body("price")
    .notEmpty()
    .withMessage("El precio de producto no puede ser nulo")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);

router.post("/", (req, res) => {
  res.json("Desde post");
});

router.put(
  "/:id",
  // validacion
  body("name")
    .notEmpty()
    .withMessage("El nombre de producto no puede ser nulo"),
  body("price")
    .notEmpty()
    .withMessage("El precio de producto no puede ser nulo")
    .isNumeric()
    .withMessage("Valor no valido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability")
    .isBoolean()
    .withMessage("El valor de availability no es valido"),
  handleInputErrors,
  updateProduct
);

router.patch("/:id", updateAvailability);

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
