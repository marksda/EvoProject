import { IFilter } from "./filter";
import { ISortOrder } from "./sort-order";

export interface IQueryParamFilters {
  paging ?: {
    pageNumber: number|null;
    pageSize: number|null;
  };
  is_pagging: number;
  fields_filter ?: IFilter[]|null;
  fields_sorter ?: ISortOrder[]|null;
};

export type qFilters = Pick<IQueryParamFilters, "fields_filter">;