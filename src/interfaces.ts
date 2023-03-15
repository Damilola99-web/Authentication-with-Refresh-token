export interface RequestError extends Error {
	message: string;
	statusCode?: number;
	errors?: any;
}
