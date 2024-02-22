import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
  return myAxios
    .post("api/auth/register", user)
    .then((response) => response.data);
};

export const userLogin = (loginDetails) => {
  return myAxios.post("api/auth/login", loginDetails).then((resp) => resp.data);
};

export const loadAllCategories = () => {
  return myAxios.get("api/auth/category").then((response) => response.data);
};

export const createPost = (postData) => {
  return privateAxios
    .post(
      `api/auth/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((resp) => resp.data);
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `api/auth/post?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((resp) => resp.data);
};

// get single post
export const loadSinglePost = (postId) => {
  return myAxios.get(`api/auth/post/${postId}`).then((resp) => resp.data);
};

export const addComment = (comment, postId) => {
  return privateAxios
    .post(`api/auth/post/${postId}/comment`, comment)
    .then((resp) => resp.data);
};

export const uploadImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`api/auth/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => resp.data);
};
