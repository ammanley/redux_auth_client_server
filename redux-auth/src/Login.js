import React from 'react';
import { connect } from 'react-redux';
import { login } from './actions';
import Loader from 'react-loader'
import Flash from './Flash'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoaded: true,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggleLoader() {
    this.setState({ isLoaded: !this.state.isLoaded });
  }

  onSubmit(e) {
    e.preventDefault();
      this.toggleLoader()
      this.props.login(this.state).then(
        (res) => {
          this.toggleLoader()
          this.context.router.push('/welcome')
          this.setState({error: false})},
        
        (err) => {
            this.toggleLoader()
            this.setState({error: true})
        });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isLoaded } = this.state;
    const { username, password } = this.state;
      if (this.state.error === true) {
          return (
              <div>
                <div>
                <div className="loader-wrapper">
                <Loader loaded={isLoaded}>
                </Loader>
                </div>
                  <form onSubmit={this.onSubmit}>
                    <Flash></Flash>
                    <h1>Sign up!</h1>
                    <div className="form-group">
                      <label htmlFor="username"></label>
                      <input placeholder="username" type="text" id="username" name="username"
                             value={this.state.username} onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password"></label>
                      <input type="password" placeholder="password" id="password" name="password"
                             value={this.state.password} onChange={this.onChange}/>
                    </div>
                    <button className="button-content">
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
          )
      }

    return (
      <div>
        <div>
        <div className="loader-wrapper">
                <Loader loaded={isLoaded}>
                </Loader>
                </div>
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" value={password} onChange={this.onChange}/>
          </div>
        <button type="submit" className="button-content">Login</button>
      </form>
      </div>
      </div>
    );
  }
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired
}



export default connect(null, { login })(LoginForm);
