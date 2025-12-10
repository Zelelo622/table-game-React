export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}
