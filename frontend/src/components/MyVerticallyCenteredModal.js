import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Share Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FacebookShareButton url={""} quote={"test"}>
          <FacebookIcon size={32} round /> Facebook
        </FacebookShareButton>
        <br />
        <br />
        <LinkedinShareButton url={""} quote={"test"}>
          <LinkedinIcon size={32} round /> Linkedin
        </LinkedinShareButton>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
