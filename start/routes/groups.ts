import router from "@adonisjs/core/services/router";
import GroupsController from "#controllers/groupsController";
import { middleware } from "#start/kernel";

router.post('/groups',[GroupsController, 'store']).use([middleware.auth()])
