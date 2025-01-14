import { z } from "zod";

const EmailSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
});

export type EmailSchema = z.infer<typeof EmailSchema>;

export { EmailSchema };
