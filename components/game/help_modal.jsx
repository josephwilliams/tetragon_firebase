import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './help_modal_style';
import Instructions from './instructions_comp';

export default class HelperModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal () {
    let newModalState = !this.state.modalIsOpen;
    this.setState({ modalIsOpen: newModalState });

    if (this.state.modalIsOpen)
      ModalStyle.content.opacity = '0';
  }

  onModalOpen () {
    ModalStyle.content.opacity = '1';
  }

  modalNode () {
    var nodeModal = null;
    if (this.state.modalIsOpen) {
      nodeModal = (
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
          onAfterOpen={this.onModalOpen}
          style={ModalStyle}
         >
          <Instructions toggleModal={this.toggleModal} />
        </Modal>
      )
    }

    return nodeModal;
  }

  render () {
    return (
      <div className="how-container">
        {this.modalNode()}
        <h5 onClick={() => this.toggleModal()}>
          how?
        </h5>
      </div>
    )
  }
}
