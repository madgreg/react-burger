
import { Redirect, Route } from 'react-router-dom';

import { RootStore } from 'services/store';
import { useAppSelector } from 'services/hooks';


export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useAppSelector((store:RootStore)=>store.userInfo);
  
  return (
    <Route
      {...rest}
      render={rest.render? rest.render: ({ location }) =>
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
