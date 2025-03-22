export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	image?: string;
	emailVerified?: boolean;
	createdAt: Date;
	updatedAt: Date;
}
