import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import {
  createPost,
  loadAllCategories,
  uploadImage,
} from "../Services/user-service";

import JoditEditor from "jodit-react";
import { getCurrenUserDetail } from "../Auth";
import { toast } from "react-toastify";

function AddPost() {
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    categoryId: -1,
  });
  const editor = useRef(null);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState(undefined);
  const [image, setImage] = useState(null);
  useEffect(() => {
    setUser(getCurrenUserDetail());

    loadAllCategories()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePost = (e) => {
    setPostDetails({ ...postDetails, [e.target.id]: e.target.value });
  };

  const addPost = (event) => {
    event.preventDefault();

    if (postDetails.title == "") {
      alert("title is required");
      return;
    }
    if (postDetails.content == "") {
      alert("content is required");
      return;
    }
    if (postDetails.categoryId == "") {
      alert("category is required");
      return;
    }

    postDetails.userId = user.id;
    createPost(postDetails)
      .then((resp) => {
        uploadImage(image, resp.postId)
          .then((data) => {
            console.log(data);
          })
          .catch(() => {
            toast.error("Error in Image Upload");
          });
        console.log(resp);
        toast.success("Post created Successfully");
      })
      .catch((err) => {
        toast.error("SomeThing Went Wrong!!!");
      });
    setPostDetails({ title: "", content: "", categoryId: "default" });
  };
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  return (
    <div className="wrapper">
      <Card className="shadow-sm mt-2 rounded-0">
        <CardBody>
          <h3>what going in your mind ?</h3>

          <Form onSubmit={addPost}>
            <div className="my-3">
              <label for="title" className="mb-1">
                Post Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="enter here"
                className="rounded-0"
                value={postDetails.title}
                onChange={handlePost}
              />
            </div>

            <div className="my-3">
              <label for="content" className="mb-1">
                Post Content
              </label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="enter here"
                className="rounded-0"
                style={{ height: "300px" }}
              /> */}
              <JoditEditor
                ref={editor}
                value={postDetails.content}
                onChange={(newContent) =>
                  setPostDetails({ ...postDetails, content: newContent })
                }
              />
            </div>
            {/* file field
             */}
            <div className="mt-3">
              <Label
                for="fileUpload"
                className="form-label d-flex align-center"
              >
                Upload image
              </Label>
              <Input id="image" type="file" onChange={handleImage} />
            </div>

            <div className="my-3">
              <label for="category" className="mb-1">
                Post Category
              </label>
              <Input
                type="select"
                id="categoryId"
                placeholder="enter here"
                className="rounded-0"
                onChange={handlePost}
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  --select category--
                </option>
                {category.map((item) => {
                  return (
                    <option value={item.categoryId} key={item.categoryId}>
                      {item.categoryTitle}
                    </option>
                  );
                })}
              </Input>
            </div>
            <Container className="text-center">
              <Button type="submit" color="primary" className="rounded-0">
                Create Post
              </Button>
              <Button color="danger" className="rounded-0 ms-2">
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddPost;
