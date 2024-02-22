import React, { useEffect, useState } from "react";
import Base from "../component/Base";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { addComment, loadSinglePost } from "../Services/user-service";
import { toast } from "react-toastify";
import { isLoggedIn } from "../Auth";

function PostPage() {
  const [comment, setComment] = useState({ content: "" });
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    loadSinglePost(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        toast.error("umable to load the post");
      });
  }, []);

  const submitPost = () => {
    if (comment.content === "") {
      toast.error("cannot be empty");
      return;
    }
    addComment(comment, post.postId)
      .then((data) => {
        toast.success("comment added");
        setPost({ ...post, comments: [...post.comments, data] });
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
    setComment({
      content: "",
    });
  };
  return (
    <Base>
      <Container>
        <Link className="mt-4" to={"/"}>
          Home
        </Link>
        /{post && <Link to={""}>{post?.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2">
              <CardBody>
                <CardText>
                  Posted By <b>{post?.user?.username}</b> on{" "}
                  <b>{new Date(post?.addedDate).toLocaleString()}</b>
                </CardText>

                <CardText>
                  <span className="text-muted">
                    {post?.category?.categoryTitle}
                  </span>
                </CardText>
                <hr />
                <CardText className="mt-1">
                  <h3>{post?.title}</h3>
                </CardText>
                <div
                  className="image-container mt-3"
                  style={{ maxWidth: "50%" }}
                >
                  <img
                    className="img-fluid"
                    src={`http://localhost:8080/api/auth/post/image/${post?.imageName}`}
                    alt=""
                  ></img>
                </div>
                <CardText
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: post?.content }}
                ></CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments({post ? post.comments.length : 0})</h3>

            {post?.comments &&
              post.comments.map((comment, index) => {
                return (
                  <Card className="mt-3 border-0" key={index}>
                    <CardBody>
                      <CardText>{comment.content}</CardText>
                    </CardBody>
                  </Card>
                );
              })}
            {isLoggedIn() && (
              <Card className="mt-3 border-0">
                <CardBody>
                  <Input
                    type="textarea"
                    placeholder="enter comment here"
                    value={comment.content}
                    onChange={(e) => setComment({ content: e.target.value })}
                  />
                  <Button
                    className="mt-2 "
                    color="primary"
                    onClick={submitPost}
                  >
                    Submit
                  </Button>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default PostPage;
