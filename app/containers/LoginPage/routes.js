/*
 *
 * LoginPage routes
 *
 */

export default function(loadModule, errorLoading, injectReducer, injectSagas, requireAuth){
  return {
      path: 'login',
      name: 'LoginPage',
      onEnter: requireAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('./reducer'),
          import('./sagas'),
          import('./index'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer,  sagas, name]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(name);
        });

        importModules.catch(errorLoading);
    },
      indexRoute: {
      name: 'Login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('./Views/main'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
      // put your child routes here
      childRoutes: [
      ],
    }
};
