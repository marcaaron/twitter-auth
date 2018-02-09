import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import TwitterPostBody from './components/TwitterPostBody';
import image from './testimage';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
		isAuthenticated: false,
		user: null,
		token: '',
		image: image,
		twitterStatus:`My results for the Yes On 1600 Cost Calculator!\n\nGet your own results at http://yeson1600.org and find out how much you'll save under a single-payer system!\n\n@WASinglePayer #YesOn1600`,
		checked:false,
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleCheck = this.handleCheck.bind(this);
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

    handleCheck(){
  	  let checked = this.state.checked;
  	  checked = !checked;
  	  this.setState({checked});
    }

  handleChange(e){
	  const twitterStatus = e.target.value;;
	  this.setState({twitterStatus});
  }

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
  };

  handleClick = () => {
		const userData = {
			token:this.state.user.twitterProvider.token,
			secret:this.state.user.twitterProvider.tokenSecret,
			image: this.state.image,
			twitterStatus: this.state.twitterStatus,
		}

		const xhttp = new XMLHttpRequest();   // new HttpRequest instance
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	       		console.log('sending JSON');
	    	}
 		};
		xhttp.open("POST", "https://pacific-forest-96555.herokuapp.com/api/twitterpost");
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify(userData));
	}

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
				  <TwitterPostBody
					  onClick={this.sendJSON}
					  image={this.state.image}
						twitterStatus={this.state.twitterStatus}
						handleChange={this.handleChange}
						handleCheck={this.handleCheck}
						handleClick={this.handleClick}
						checked={this.state.checked}
				  />
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
        </div>
      ) :
      (
	  <div>

        <TwitterLogin loginUrl="https://pacific-forest-96555.herokuapp.com/api/v1/auth/twitter"
                      onFailure={this.onFailed} onSuccess={this.onSuccess}
                      requestTokenUrl="https://pacific-forest-96555.herokuapp.com/api/v1/auth/twitter/reverse"/>
					  </div>
      );

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default App;
