
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function ProtectedRouteAuth({ children, ...rest }) {
  const { isAuth } = useSelector(store=>store.userInfo);

  
  return (
    <Route
      {...rest}
      render={({ location }) =>
      !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { referrer: location.pathname }
            }}
          />
        )
      }
    />
  );
}
