import router from "@adonisjs/core/services/router";
import UserSessionsController from "#controllers/userSessionsController";
import { middleware } from "#start/kernel";


router.post('/user-sessions',[UserSessionsController,'store'])
router
  .delete('/user-sessions', [UserSessionsController, 'destroy'])
  .use(middleware.auth())