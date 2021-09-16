import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { userVar } from '../cache';

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
        id
        name
    }
  }
`;

function Login() {
  const history = useHistory();
  const [formState, setFormState] = useState({ email: '', password: '', name: '' });

  const [signup, { error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    errorPolicy: 'all',
    onCompleted: ({ signup }) => {
      if (signup) {
        userVar({ name: signup.name, isLoggedOut: false });
        history.push('/');
      }
    }
  });

  return <div className="signup">
    <Helmet>
       <title>{ 'Sign up – Pandora' }</title>
    </Helmet>
    <h1>Sign up to create playlists</h1>
    { error && <p className="error">{error.message}</p> }

    <input type="text" value={formState.email} autoFocus onChange={(e) => setFormState({
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