import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      infoMessage: '',
      color: 'black',
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(event) {
    this.setState({ username: event.target.value, infoMessage: '' });
  }

  login(event) {
    event.preventDefault();
    if (this.state.username === '') {
      this.setState({ infoMessage: 'Please provide a username' });
    }
    else if (this.state.username.length === 0) {
      this.setState({ infoMessage: '' });
    }

    let regex = /^[\s\wÅÄÖåäö-]{1,12}$/;
    if (regex.test(this.state.username)) {
      this.props.onLogin({ username: this.state.username });
      console.log('correct');
    }
    else {
      console.log('not good');
      this.setState({ infoMessage: 'The username should be between 1-12 characters (or numbers) long and may contain "-" or "_"', color: 'red' });
    }
  }

   render() {
     return (
     <div className='login-window'>  
        <form className='login-form'>
          <label htmlFor='username'>Pick a username</label>  
          <p style={{ color: this.state.color }}>{this.state.infoMessage}</p>
          <input onChange={this.onChange} value={this.state.username} name='username' placeholder='pug-lover_92'></input>  
          <button type='submit' onClick={this.login}>Login</button>
        </form>
     </div>
     )
   }
 }


export default Login;