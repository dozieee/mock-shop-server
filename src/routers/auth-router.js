// the cart router
import { Router } from 'express';
const route = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import Controller from '../controllers';
const { getCart, addToCart, deleteFromCart } = Controller;
// auth middleware
// import { authMiddleware } from "";

// root
router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "Hello from auth service"
    })
    .end();
});

// signup
router.post("/signup", makeCallBack(signup));
// login
router.post("/login", makeCallBack(login));
// logout
router.get("/logout", authMiddleware, makeCallBack(logout));

export default router;