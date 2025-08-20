import UsersController from '#controllers/UsersController'
import router from '@adonisjs/core/services/router'



router.post('/users', [UsersController,'store'])
router.put('/users/:id', [UsersController,'update'])