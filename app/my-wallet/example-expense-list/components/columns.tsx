"use client";

import { ColumnDef } from "@tanstack/react-table";
import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { typeIconMap } from "../data/type-icon-map";
import { DefaultIcon } from "@/components/icon";

export const columns: ColumnDef<Task>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Type" />
		),
		// cell: ({ row }) => <div className="w-[80px]">{row.getValue("type")}</div>,
		// cell: ({ row }) => (
		// 	<div className="w-[170px] flex items-center gap-2">
		// 		<div className="shrink-0 flex items-center justify-center h-[40px] w-[40px] bg-[#FCEED4] rounded-sm">
		// 			<ShoppingBagIcon />
		// 		</div>
		// 		<div className="shrink-0 flex items-center justify-center h-[40px] w-[40px] bg-[#BDDCFF] rounded-sm">
		// 			<TransportationIcon />
		// 		</div>
		// 		<div className="shrink-0 flex items-center justify-center h-[40px] w-[40px] bg-[#CFFAEA] rounded-sm">
		// 			<SalaryIcon />
		// 		</div>
		// 		<div className="shrink-0 flex items-center justify-center h-[40px] w-[40px] bg-[#FDD5D7] rounded-sm">
		// 			<FoodIcon />
		// 		</div>
		// 		<div className="shrink-0 flex items-center justify-center h-[40px] w-[40px] bg-[#EEE5FF] rounded-sm">
		// 			<SubscriptionIcon />
		// 		</div>
		// 		<span className="font-semibold text-gray-800 dark:text-white text-sm">
		// 			{row.getValue("type")}
		// 		</span>
		// 	</div>
		// ),
		cell: ({ row }) => {
			const type: string = row.getValue("type");
			const iconData = typeIconMap[type as keyof typeof typeIconMap];

			// fallback values if type not found
			const Icon = iconData?.icon || DefaultIcon;
			const bg = iconData?.bg || "var(--default-bg)";

			return (
				<div className="w-[170px] flex items-center gap-3">
					<div
						className="shrink-0 flex items-center justify-center h-10 w-10 rounded-md"
						style={{ backgroundColor: bg }}
					>
						{<Icon />}
					</div>

					<span className="font-semibold text-gray-800 dark:text-white text-sm">
						{type}
					</span>
				</div>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
			const label = labels.find((label) => label.value === row.original.label);

			return (
				<div className="flex space-x-2">
					{label && <Badge variant="outline">{label.label}</Badge>}
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("title")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const status = statuses.find(
				(status) => status.value === row.getValue("status")
			);

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center">
					{status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "priority",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Priority" />
		),
		cell: ({ row }) => {
			const priority = priorities.find(
				(priority) => priority.value === row.getValue("priority")
			);

			if (!priority) {
				return null;
			}

			return (
				<div className="flex items-center">
					{priority.icon && (
						<priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)}
					<span>{priority.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
