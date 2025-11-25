import {Router} from 'express'

const router=Router()

// routing
//              request (lo que se pide)
//              response (lo que se obtiene)
router.get("/", (req, res) => {
  res.json("Desde get");
});

router.post("/", (req, res) => {
  res.json("Desde post");
});

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.patch("/", (req, res) => {
  res.json("Desde patch");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router
