import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"
import User from "#models/users"
import BadRequestException from "#exceptions/bad_request_exception"
import { createUserValidator } from "#validators/create_user"
import { UpdateUserValidator } from "#validators/update_user"

export default class UsersController {

// @inject()
// async create({request, response}: HttpContext){

// }


@inject()
async store({request, response}: HttpContext) {
    
    const userPayload = await request.validateUsing(createUserValidator)

    
    const [userByEmail, userByName] = await Promise.all([

          User.findBy('email',userPayload.email),
          User.findBy('name', userPayload.name)
    ])

   // validações para criação de um usuário, já que o método store 
    if (userByEmail)
        throw new BadRequestException('email is already in use', 409)
    if (userByName)
        throw new BadRequestException('username is already in use',409)


    const user = await User.create(userPayload)

    return response.created({user})
}

@inject()
 async update({request, response}:HttpContext){
    const {email, avatar, password} = await request.validateUsing(UpdateUserValidator)
    const id = request.param('id') // recebe o comando de procurar um ID
    const user = await User.findOrFail(id) // puxa o usuário pelo id

    user.email = email
    user.password = password
    if (avatar) user.avatar = avatar
    await user.save()

   
    return response.ok({user})
 } 

}