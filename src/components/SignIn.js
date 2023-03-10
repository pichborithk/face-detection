import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }
  onEmailInput = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  saveAuthTokeInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  };

  onSummitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userId && data.success === 'true') {
          this.saveAuthTokeInSession(data.token);
          fetch(`http://localhost:3000/profile/${data.userId}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: data.token,
            },
          })
            .then((resp) => resp.json())
            .then((user) => {
              if (user && user.email) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
              }
            })
            .catch(console.log);
        }
      });
  };

  render() {
    return (
      <>
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
          <main className='pa4 black-80 zindex white'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    onChange={this.onEmailInput}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='email'
                    name='email-address'
                    id='email-address'
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onChange={this.onPasswordInput}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                  />
                </div>
              </fieldset>
              <div className=''>
                <input
                  onClick={this.onSummitSignIn}
                  className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib white'
                  type='submit'
                  value='Sign in'
                />
              </div>
              <div className='lh-copy mt3'>
                <p
                  onClick={() => this.props.onRouteChange('register')}
                  className='f6 link dim db pointer'
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </>
    );
  }
}

export default SignIn;
