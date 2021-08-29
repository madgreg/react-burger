
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector(store=>store.userInfo);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { referrer: location.pathname }
            }}
          />
        )
      }
    />
  );
}
