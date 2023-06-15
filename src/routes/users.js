import { Router } from "express";
import UserService from "../services/user.js";

const route = Router();

const userService = new UserService(process.env.USER_SERVICE_URL);

route.get('/:userId', async (req, res) => {
  const userRes = await userService.getUserById(req.params.userId);
  const user = await userRes.json();

  // leave evidence that the data passed through this service
  user.touchedBy.push('service_1');

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(user));
});

export default route;