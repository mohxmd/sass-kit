import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.number().optional().default(3000),
});

const processEnv = EnvSchema.safeParse(process.env);

if (!processEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(JSON.stringify(z.flattenError(processEnv.error).fieldErrors, null, 2));
  process.exit(1);
}

const env = processEnv.data;

export default env;
export type Env = z.infer<typeof EnvSchema>;
