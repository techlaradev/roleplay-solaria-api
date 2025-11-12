import GroupsController from "#controllers/groupsController";
import router from "@adonisjs/core/services/router";

router.post('/groups',[GroupsController, 'store'])
