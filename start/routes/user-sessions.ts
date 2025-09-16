import router from "@adonisjs/core/services/router";
import UserSessionsController from "#controllers/userSessionsController";


router.post('/user-sessions',[UserSessionsController,'store'])