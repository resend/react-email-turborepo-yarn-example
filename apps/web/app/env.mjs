// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    AWS_EMAIL_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_EMAIL_ACCESS_KEY: z.string().min(1),
    AWS_EMAIL_REGION: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    AWS_EMAIL_SECRET_ACCESS_KEY: process.env.AWS_EMAIL_SECRET_ACCESS_KEY,
    AWS_EMAIL_ACCESS_KEY: process.env.AWS_EMAIL_ACCESS_KEY,
    AWS_EMAIL_REGION: process.env.AWS_EMAIL_REGION,
  },
});
