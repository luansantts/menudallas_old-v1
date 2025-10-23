import { promosConstants } from "../constants";
import { promosService } from "../services";

export const promosActions = {
  getAll,
};

function getAll(userId) {
  return (dispatch) => {
    dispatch(request());

    promosService.getAll({ userId }).then(
      (data) => dispatch(success(data)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: promosConstants.GETALL_REQUEST };
  }
  function success(data) {
    return { type: promosConstants.GETALL_SUCCESS, data };
  }
  function failure(error) {
    return { type: promosConstants.GETALL_FAILURE, error };
  }
}
