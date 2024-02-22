//isLoggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data == null) {
    return false;
  } else {
    return true;
  }
};
//doLogin=>data=>set to localstorage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//dologout=>data =>remove from local storage
export const dologout = (next) => {
  localStorage.removeItem("data");
  next();
};

export const getCurrenUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"))?.user;
  } else {
    return undefined;
  }
};
export const getToken = () => {
  if (isLoggedIn()) {
    // console.log(JSON.parse(localStorage.getItem("data")));
    return JSON.parse(localStorage.getItem("data")).accessToken;
  } else {
    return null;
  }
};
