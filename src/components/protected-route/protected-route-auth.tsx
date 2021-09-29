
import { Redirect, Route } from 'react-router-dom';

import { RootStore } from 'services/store';
import { useAppSelector } from 'services/hooks';


export function ProtectedRouteAuth({ children, ...rest }) {
  const { isAuth } = useAppSelector((store:RootStore)=>store.userInfo);

  
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
