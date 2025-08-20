import vine from '@vinejs/vine'


export const UpdateUserValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(6),
    email: vine.string().trim().email(),
    avatar: vine.string().trim().url().optional()}
 ))
  