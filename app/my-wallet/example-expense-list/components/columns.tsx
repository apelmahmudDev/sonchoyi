"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { typeIconMap } from "../../../../constants/type-icon-map";
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
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("description")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created at" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					<span>{row.getValue("createdAt")}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Amount" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<span>
						<span>{row.getValue("amount")}</span>
					</span>
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
