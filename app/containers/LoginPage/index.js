import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { userLogin } from './actions';
import { prepareSelector } from 'shared/functions';
import { endpoint } from 'shared/constants';
import './style.css';

export class LoginPage extends React.PureComponent {

  componentWillMount() {
    this.props.firebase.unauth();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userToken !== this.props.userToken) {
      console.log('userToken = ', nextProps.userToken);
    }

    if (nextProps.loadError !== this.props.loadError) {
      console.log('loadError = ', nextProps.loadError);
    }
  }

  onLogin = () => {
    let email = this.refs.emailID.getValue();
    let password = this.refs.password.getValue();
    console.log(this.props);

    this.props.firebase.authWithPassword({
      email: email,
      password: password
    }, this.loginResult);
  };

  loginResult = (error, user) => {
    console.log('loginResult = ', user, error);
    if (user) {
      this.props.firebase.auth().currentUser.getToken(true)
        .then((result) => {
          console.log(result);
          this.props.dispatchUserLogin(result);
        })
    }
  };

  render() {
    return (
      <article className="article">
        <Helmet
          title="Login Page"
          meta={[
            { name: 'description', content: 'Login Page' },
          ]}
        />
        <div>
          <Paper zDepth={1} className="page-container">
            <div className="login-header-container">
              <h1 className="list-header-title">
                Login
              </h1>
            </div>

            <div className="login-form-container">
              <div className="login-form">
                <TextField
                  id='emailID'
                  floatingLabelText='Email'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  type='email'
                  ref='emailID'/>

                <TextField
                  id='password'
                  floatingLabelText='Password'
                  floatingLabelFixed={true}
                  type='password'
                  fullWidth={true}
                  onKeyUp={this.onEnter}
                  ref='password'/>
              </div>
              <div className="actions-container">
                <RaisedButton
                  style={{borderRadius: '5px'}}
                  primary={true}
                  label={'Login'}
                  labelPosition='before'
                  backgroundColor='#2A80B9'
                  ref='loginBtn'
                  labelStyle={{color: '#fff'}}
                  onClick={() => this.onLogin()}/>
              </div>
            </div>
          </Paper>
        </div>
      </article>
    );
  }
}

LoginPage.propTypes = {
  loading: React.PropTypes.bool,
  dispatchUserLogin: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  // API
  dispatchUserLogin: (firebaseToken) => dispatch(userLogin(firebaseToken)),
});

const prepareLessonsSelector = value => prepareSelector('auth', value);
const mapStateToProps = createStructuredSelector({
  firebase: prepareSelector('firebase', 'firebase'),
  userToken: prepareLessonsSelector('userToken'),
  loading: prepareLessonsSelector('loading'),
  loadError: prepareLessonsSelector('loadError'),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
