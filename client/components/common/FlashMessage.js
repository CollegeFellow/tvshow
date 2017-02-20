import React from 'react';
import classnames from 'classnames';

class FlashMessage extends React.Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render(){
    const { id, message, type } = this.props.message;

    return (
      <div className={classnames('alert',{
          'alert-success': type === 'success',
          'alert-danger': type === 'error'
        })}>
        <button className="close" onClick={this.onClick}><span>&times;</span></button>
        { message }
      </div>
    );
  }

}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;