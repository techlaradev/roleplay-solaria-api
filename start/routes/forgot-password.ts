import router from "@adonisjs/core/services/router";
import passwordsController from "#controllers/passwordController";

router.post('/forgot-password', [passwordsController,'forgetPassword'])