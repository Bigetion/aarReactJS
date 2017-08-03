// These are the pages you can go to. They are all wrapped in the App component,
// which should contain the navbar etc See
// http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import appSagas from 'containers/App/sagas';

// import-module-start
import MainPage from 'containers/MainPage/routes';
import RolePage from 'containers/RolePage/routes';
import PermissionPage from 'containers/PermissionPage/routes';
import UserPage from 'containers/UserPage/routes';
import LoginPage from 'containers/LoginPage/routes';
// import-module-end

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  injectSagas(appSagas);
  // injectSagas(authSagas);

  function requireAuth(nextState, replace) {
    if (!localStorage.jwt) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname},
      });
    }
  }

  return [
    MainPage(loadModule, errorLoading, injectReducer, injectSagas, requireAuth),
    RolePage(loadModule, errorLoading, injectReducer, injectSagas, requireAuth),
    PermissionPage(loadModule, errorLoading, injectReducer, injectSagas, requireAuth),
    UserPage(loadModule, errorLoading, injectReducer, injectSagas, requireAuth),
    LoginPage(loadModule, errorLoading, injectReducer, injectSagas),
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
