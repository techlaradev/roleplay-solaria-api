import router from "@adonisjs/core/services/router";
import GroupRequestsController from "#controllers/groupRequestController";
import { middleware } from "#start/kernel";

router.post('/groups/:groupId/requests',[GroupRequestsController, 'store']).use(middleware.auth())
