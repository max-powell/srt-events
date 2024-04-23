import { Speaker } from '../../shared/interfaces';

export interface RandomuserResponse {
  info: {
    results: number;
    page: number;
  };
  results: Speaker[];
}
