import { Router } from "express";
import { aiController } from "./ai/ai.controller";


const router = Router();
const routes = [
  {
    path: "/ai",
    route: new aiController().router,
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
