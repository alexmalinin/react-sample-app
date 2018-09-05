import axios from "axios";

export default store => next => action => {
  const { type, contactRequest, payload, ...rest } = action;
  if (!contactRequest) return next(action);

  console.log("payload", payload);

  axios({
    method: "POST",
    url: contactRequest,
    data: {
      payload
    }
  })
    .then(response => {
      console.log("success");
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    });
};
