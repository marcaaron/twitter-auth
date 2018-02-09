import React, { Component } from 'react';

class TwitterPostBody extends Component {
  constructor(props) {
    super(props);
	this.state={
	}
  }



  componentDidMount(){
	const image = new Image();
  	image.src = `data:image/png;base64,${this.props.image}`;
  	document.querySelector('.pop-up-thumbnail').appendChild(image);
  }



  render() {
	return (
      <div className="pop-up-container">
	  <div className="pop-up-inner">
		  <div className="pop-up-status-body">
			  <textarea onChange={this.props.handleChange} className="pop-up-tweet-content" value={this.props.twitterStatus}/>
			  <div className="pop-up-thumbnail"></div>
		  </div>
		  <div onClick={this.props.handleClick} className="pop-up-tweet-button">Tweet</div>
		  <label onChange={this.props.handleCheck} className="pop-up-checkbox"><input type="checkbox" checked={this.props.checked}></input>Please Check This Box If You Would Like to Recieve Updates from the Yes On 1600 initiative.</label>
		  <p className="pop-up-disclaimer">By authenticating you have given us permission to post an image of your results and the above message to your Twitter feed. Feel free to customize the message! But please close this window if you are not interested in sharing this awesome post with your followers. Thanks!</p>
	  </div>
      </div>
    );
  }
}

export default TwitterPostBody;
