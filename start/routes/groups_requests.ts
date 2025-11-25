import router from "@adonisjs/core/services/router";
import GroupRequestsController from "#controllers/group_requests_controller";

router.post('/groups/:groupId/requests',[GroupRequestsController, 'store'])
