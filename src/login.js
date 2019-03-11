import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(event) {
    this.setState({ username: event.target.value });
  }

  login(event) {
    this.props.onLogin({ username: this.state.username });
  }

   render() {
     return (
     <div className='login-window'>  
      <label>Pick a username</label>  
      <input onChange={this.onChange} value={this.state.username}></input>  
      <button onClick={this.login}>Login</button>
     </div>
     )
   }
 }


export default Login;