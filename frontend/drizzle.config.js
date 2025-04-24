/** @type {import ("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://job_owner:npg_RbHuM8wstC5r@ep-snowy-voice-a4imt9zt-pooler.us-east-1.aws.neon.tech/job?sslmode=require"
    }
};