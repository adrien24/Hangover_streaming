import { z } from 'zod'

export const loginDataSchema = z.object({
  user: z.array(z.string()),
  token: z.string().optional(),
  error: z
    .object({
      message: z.string(),
    })
    .optional(),
})

export type LoginData = z.infer<typeof loginDataSchema>
