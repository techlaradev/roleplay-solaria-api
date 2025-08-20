import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    password: vine.string().minLength(6),
    email: vine.string().trim().email()
  })
)

