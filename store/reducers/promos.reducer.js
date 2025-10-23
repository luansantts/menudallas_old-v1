import { promosConstants } from '../constants';

export function promos(state = {}, action) {
  switch (action.type) {
    case promosConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case promosConstants.GETALL_SUCCESS:
      return {
        items: action.data
      };
    case promosConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}