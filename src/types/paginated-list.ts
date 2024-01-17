export interface PaginatedList<T> {
	currentPage: number;
	data: T[];
}