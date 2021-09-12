import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { userVar } from '../cache';

function Login() {
  const history = useHistory();
  const [formState, setFormState] = useState({ email: '', password: '', name: '' });

  const SIGNUP_MUTATION = gql `
    mutation SignupMutation(
      $email: String!
      $password: String!
      $name: String!
    ) {
      signup(
        email: $email
        password: $password
        name: $name
      ) {
        token
      }
    }
  `;

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      userVar({ name: signup.name, isLoggedOut: false });
      history.push('/');
    }
  });

  return <div className="signup">
    <h1>Sign up to create playlists</h1>

    <input type="text" value={formState.email} onChange={(e) => setFormState({
        ...formState,
        email: e.target.value
      })
      } placeholder="Your email address"/>

    <input value={formState.password} onChange={(e) => setFormState({
        ...formState,
        password: e.target.value
      })
      } type="password" placeholder="Choose a safe password"/>

    <input value={formState.name} onChange={(e) => setFormState({
        ...formState,
        name: e.target.value
      })
      } type="text" placeholder="Your name"/>

    <button onClick={signup}>Sign up</button>
  </div>;
}
export default Login;