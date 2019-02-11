import { registerReducer } from './store';

const modules = {};

export default (store) => (name, moduleProvider) => {
  if (modules.hasOwnProperty(name)) {
    return Promise.resolve(modules[name]);
  }
  else {
    return moduleProvider.then(mod => {
      if (mod.middleware) {
        let middleware = [];
        Object.keys(mod.middleware).forEach(key => {
          middleware.push(mod.middleware[key]);
        });
        registerReducer(store, name, mod.reducer, middleware);
      } else {
        registerReducer(store, name, mod.reducer);
      }
      return mod;
    });
  }
};
