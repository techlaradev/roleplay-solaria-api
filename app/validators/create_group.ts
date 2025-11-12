import vine from '@vinejs/vine'

export const createGroupValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    description: vine.string().minLength(6),
    schedule: vine.string().minLength(5),
    location: vine.string().minLength(10),
    chronic: vine.string().minLength(15),
    master: vine.number(),

  })
)
