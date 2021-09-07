import {useState} from 'react';

function Login() {

  const [formState, setFormState] = useState({login: true, email: '', password: '', name: ''});

  return <div className="login">
    <h1>Log in</h1>

    <input value={formState.email} type="text" placeholder="Your email address"/>
    <input value={formState.password} type="password" placeholder="Choose a safe password"/>
    
    <button onClick={() => console.log('onClick')}>
      {
        formState.login
          ? 'login'
          : 'create account'
      }
    </button>
    <button>
      {
        formState.login
          ? 'need to create an account?'
          : 'already have an account?'
      }
    </button>
  </div>;
}
export default Login;
