import {useState} from 'react';

function Login() {

  const [formState, setFormState] = useState({email: '', password: ''});

  return <div className="login">
    <h1>Log in</h1>

    <input value={formState.email} onChange={(e) => setFormState({
        ...formState,
        email: e.target.value
      })} type="text" placeholder="Your email address"/>

    <input value={formState.password} type="password" onChange={(e) => setFormState({
        ...formState,
        password: e.target.value
      })} placeholder="Password"/>

    <button onClick={() => console.log('onClick')}>
      Log in
    </button>
    <button>
      Need to create an account?
    </button>
  </div>;
}
export default Login;
