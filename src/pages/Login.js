import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory, Link } from 'react-router-dom';
import { userVar } from '../cache';

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

function Login() {
  const history = useHistory();
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    errorPolicy: 'all',
    onCompleted: ({ login }) => {
      if (login) {
        userVar({ name: login.name, isLoggedOut: false });
        history.push('/');
      }
    }
  });

  return <div className="login">
    <Helmet>
       <title>{ 'Login – Pandora' }</title>
    </Helmet>
    <h1>Log in</h1>
    { error && <p className="error">{error.message}</p> }

    <input value={formState.email} autoFocus onChange={(e) => setFormState({
        ...formState,
        email: e.target.value
      })} type="text" placeholder="Your email address"/>

    <input value={formState.password} type="password" onChange={(e) => setFormState({
        ...formState,
        password: e.target.value
      })} placeholder="Password"/>

    <button onClick={login}>Log in</button>
    <Link to="/signup">Need to create an account?</Link>
  </div>;
}
export default Login;