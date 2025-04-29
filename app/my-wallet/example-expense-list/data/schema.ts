import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	type: z.string(),
	description: z.string(),
	createdAt: z.string(),
	amount: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
