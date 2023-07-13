import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Modal } from "reactstrap";

import { Provider } from "./context";

class UncontrolledModal extends React.Component {
  static propTypes = {
    target: PropTypes.string.isRequired,
    hasinput: PropTypes.string,
  };
  static defaultProps = {
    hasinput: "false",
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.boundClickEventHandler = this.clickEventHandler.bind(this);
  }

  componentDidMount() {
    if (typeof document !== "undefined") {
      this.triggerElement = document.querySelector(`#${this.props.target}`);

      if (!this.triggerElement) {
        // eslint-disable-next-line no-console
        console.error(
          "UncontrolledModal: 'target' element has not been found in the DOM via querySelector",
        );
        return;
      }

      this.triggerElement.addEventListener(
        "click",
        this.boundClickEventHandler,
      );
    }
  }

  componentWillUnmount() {
    if (this.triggerElement) {
      this.triggerElement.removeEventListener(
        "click",
        this.boundClickEventHandler,
      );
    }
  }

  clickEventHandler() {
    this.setState({ isOpen: true });
  }

  render() {
    const modalProps = _.omit(this.props, ["target"]);
    const toggleModal = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };
    const enterEventCallback = (e) => {
      e.stopPropagation();

      if (
        e.key === "Enter" &&
        this.state.isOpen === true &&
        this.props.hasinput === "false"
      ) {
        console.log("enter event from CustomModal");
        toggleModal();
      }
    };
    const addEnterEvent = () => {
      if (this.props.hasinput === "false") {
        document.addEventListener("keydown", enterEventCallback, true);
      }
    };
    const removeEnterEvent = () => {
      if (this.props.hasinput === "false") {
        document.removeEventListener("keydown", enterEventCallback, true);
      }
    };

    return (
      <Provider value={{ toggleModal }}>
        <Modal
          {...modalProps}
          isOpen={this.state.isOpen}
          toggle={toggleModal}
          onEnter={addEnterEvent}
          onExit={removeEnterEvent}
        />
      </Provider>
    );
  }
}

export { UncontrolledModal };
