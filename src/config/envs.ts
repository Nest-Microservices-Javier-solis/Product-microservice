import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();



const envsSchema = z.object({
    SERVER: z.array(z.string()).min(1, "SERVER must be a non-empty array"),
})



const envs = envsSchema.parse({
    ...process.env,
    SERVER: process.env.SERVER?.split(',')
});


if (!envs) {
    throw new Error(`Invalid environment variables'`);
}


export const environment={
    SERVER: envs.SERVER
}





