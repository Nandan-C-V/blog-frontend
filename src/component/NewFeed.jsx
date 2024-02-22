import React, { useEffect, useState } from "react";
import { loadAllPosts } from "../Services/user-service";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
        console.log(data);
        window.scroll(0, 0);
      })
      .catch((error) => {
        toast.error("error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1> Blog count {postContent?.totalElements} </h1>

          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
          >
            {postContent.content.map((post, index) => {
              return <Post post={post} key={index} />;
            })}
          </InfiniteScroll>

          {/* <Container className="mt-3">
            <Pagination size="lg">
              {postContent.pageNumber > 0 && (
                <PaginationItem
                  disabled={postContent.lastPage}
                  onClick={() => changePage(--postContent.pageNumber)}
                >
                  <PaginationLink previous>Previous</PaginationLink>
                </PaginationItem>
              )}

              {[...Array(postContent?.totalPages)].map((item, index) => {
                return (
                  <PaginationItem
                    onClick={() => changePage(index)}
                    active={index === postContent.pageNumber}
                  >
                    <PaginationLink index>{index + 1}</PaginationLink>
                  </PaginationItem>
                );
              })}

              {!postContent.lastPage && (
                <PaginationItem
                  disabled={postContent.lastPage}
                  onClick={() => changePage(++postContent.pageNumber)}
                >
                  <PaginationLink next>Next</PaginationLink>
                </PaginationItem>
              )}
            </Pagination>
          </Container> */}
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
