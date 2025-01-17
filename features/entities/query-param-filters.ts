import { IFilter } from "./filter";
import { ISortOrder } from "./sort-order";

export interface IQueryParamFilters {
  is_paging: boolean;
  paging ?: {
    pageNumber: number|null;
    pageSize: number|null;
  };
  fields_filter ?: IFilter[]|null;
  fields_sorter ?: ISortOrder[]|null;
};

export type qFilters = Pick<IQueryParamFilters, "fields_filter">;