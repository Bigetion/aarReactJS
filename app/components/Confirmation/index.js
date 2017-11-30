import React, { PropTypes } from 'react';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { confirmable } from 'react-confirm';

class Confirmation extends React.Component {
  componentDidMount() {
  }
  render() {
    const {
      okLabbel = 'OK',
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
    } = this.props;
    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} style={{ paddingTop: '150px' }} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape} bsSize="sm">
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-l" bsStyle="primary" onClick={proceed}>{okLabbel}</Button>
            <Button bsStyle="warning" onClick={cancel}>{cancelLabel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Confirmation.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,
  cancel: PropTypes.func,
  dismiss: PropTypes.func,
  enableEscape: PropTypes.bool,
};

export default confirmable(Confirmation);
