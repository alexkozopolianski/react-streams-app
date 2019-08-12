import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
          <div onClick={(e) => e.stopPropagation() } className="ui standart modal visible active">
          <div className="header">Delete Stream</div>
          <div className="content">
          {props.content}
          </div>
            <div className="actions">
           {props.actions}
            </div>
          </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;