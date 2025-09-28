import z from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),

  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.url(),

  // GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  // GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine(
      (val) => val.startsWith("postgresql://") || val.startsWith("postgres://"),
      "DATABASE_URL must be a valid PostgreSQL connection string",
    ),
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
