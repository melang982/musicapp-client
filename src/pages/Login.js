import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { userVar } from '../cache';

function Login() {
  const history = useHistory();
  const [formState, setFormState] = useState({ email: '', password: '' });

  const LOGIN_MUTATION = gql`
    mutation LoginMutation(
      $email: String!
      $password: String!
    ) {
      login(email: $email, password: $password) {
        id
        name
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      //console.log(login.name);
      userVar({ name: login.name, isLoggedOut: false });
      history.push('/');
    }
  });

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

    <button onClick={login}>Log in</button>
    <button>Need to create an account?</button>
  </div>;
}
export default Login;