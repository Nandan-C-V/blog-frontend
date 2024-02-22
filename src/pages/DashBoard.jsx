import React from "react";
import Base from "../component/Base";
import AddPost from "../component/AddPost";
import { Container } from "reactstrap";

function DashBoard() {
  return (
    <>
      <Base>
        <Container>
          <AddPost />
        </Container>
      </Base>
    </>
  );
}

export default DashBoard;
