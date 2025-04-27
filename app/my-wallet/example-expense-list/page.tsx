import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import { z } from "zod";
import { taskSchema } from "./data/schema";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Tasks",
	description: "A task and issue tracker build using Tanstack Table.",
};

// Simulate a database read for tasks.
async function getTasks() {
	const data = await fs.readFile(
		path.join(
			process.cwd(),
			"app",
			"my-wallet",
			"example-expense-list",
			"data",
			"tasks.json"
		)
	);

	const tasks = JSON.parse(data.toString());

	return z.array(taskSchema).parse(tasks);
}

export default async function ExamplePage() {
	const tasks = await getTasks();

	return (
		<Card>
			<CardContent>
				<DataTable data={tasks} columns={columns} />
			</CardContent>
		</Card>
	);
}
