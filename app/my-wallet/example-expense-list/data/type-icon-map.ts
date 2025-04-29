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
	HealthCareIcon,
	TravelIcon,
	OtherIcon,
	DateSaverIcon,
	FinanceIcon,
	RealEstateAgentIcon,
	UniverseIcon,
	TutorIcon,
	SellIcon,
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
		bg: "var(--interest-bg)",
	},
	Healthcare: {
		icon: HealthCareIcon,
		bg: "var(--healthcare-bg)",
	},
	Travel: {
		icon: TravelIcon,
		bg: "var(--travel-bg)",
	},
	Bonus: {
		icon: DateSaverIcon,
		bg: "var(--bonus-bg)",
	},
	Interest: {
		icon: DateSaverIcon,
		bg: "var(--interest-bg)",
	},
	Business: {
		icon: FinanceIcon,
		bg: "var(--business-bg)",
	},
	Investments: {
		icon: RealEstateAgentIcon,
		bg: "var(--investments-bg)",
	},
	Freelance: {
		icon: UniverseIcon,
		bg: "var(--freelance-bg)",
	},
	Savings: {
		icon: SalaryIcon,
		bg: "var(--savings-bg)",
	},
	Pension: {
		icon: SalaryIcon,
		bg: "var(--pension-bg)",
	},
	Tutoring: {
		icon: TutorIcon,
		bg: "var(--tutoring-bg)",
	},
	Selling: {
		icon: SellIcon,
		bg: "var(--selling-bg)",
	},
	Other: {
		icon: OtherIcon,
		bg: "var(--other-bg)",
	},
} as const;
