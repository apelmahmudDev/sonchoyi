import {
	SalaryIcon,
	ShoppingBagIcon,
	TransportationIcon,
	FoodIcon,
	SubscriptionIcon,
	AcademicCapIcon,
	RentIcon,
	UtilitiesIcon,
	EntertainmentIcon,
} from "@/components/icon";

export const typeIconMap = {
	Shopping: {
		icon: ShoppingBagIcon,
		bg: "var(--shopping-bg)",
	},
	Transportation: {
		icon: TransportationIcon,
		bg: "var(--transportation-bg)",
	},
	Salary: {
		icon: SalaryIcon,
		bg: "var(--salary-bg)",
	},
	Food: {
		icon: FoodIcon,
		bg: "var(--food-bg)",
	},
	Subscription: {
		icon: SubscriptionIcon,
		bg: "var(--subscription-bg)",
	},
	Education: {
		icon: AcademicCapIcon,
		bg: "var(--subscription-bg)",
	},
	Rent: {
		icon: RentIcon,
		bg: "var(--rent-bg)",
	},
	Utilities: {
		icon: UtilitiesIcon,
		bg: "var(--utilities-bg)",
	},
	Entertainment: {
		icon: EntertainmentIcon,
		bg: "var(--entertainment-bg)",
	},
} as const;
