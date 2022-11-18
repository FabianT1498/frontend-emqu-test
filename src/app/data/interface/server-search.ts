import { SearchOptions } from '@data/interface/search-options';

export interface ServerSearchCriterias {
  ipv4: string;
  domainName: string;
}

export interface ServerSearch {
  searchCriterias: ServerSearchCriterias;
  searchOptions: SearchOptions;
}
