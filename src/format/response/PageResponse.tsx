export default interface PageResponse<T> {
  totalPages: number;
  totalElements: number;
  content: T[];
  number: number;
  size: number;
}
