import { Bouncer } from '@adonisjs/bouncer'
/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import User from '#models/users'

/**
 * Delete the following ability to start from
 * scratch
 */

// resumo: só iremos deixar o usuário mudar alguma coisa no perfil dele se o id for igual!!
//  ou seja, nada de intrusos
export const editUser = Bouncer.ability(async (currentUser:User, userToEdit: User) => {
  
return currentUser.id === userToEdit.id

})
