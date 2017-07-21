
export const ruleRunner = (field, name, validations) => {
  return (state) => {
    for (let v of validations) {
      let errorMessageFunc = v(state[field], state);
      if (errorMessageFunc) {
        return { [field]: errorMessageFunc(name) };
      }
    }
    return null;
  };
};

export const runValidate = (state, runners) => {
  return runners.reduce((memo, runner) => {
    return Object.assign(memo, runner(state));
  }, {});
};

export const run = (field, state, runners) => {
  if (!state.touched) state.touched = [];
  let newRunners = [];
  runners.forEach(function (item) {
    newRunners.push(ruleRunner(item.name, item.label, item.validator))
  });

  return newRunners.reduce((memo, runner) => {
    if (state.touched.indexOf(field) == -1) {
      state.touched.push(field);
    }
    return Object.assign(memo, runner(state));
  }, {});
};

export const runAll = (state, runners) => {
  if (!state.touched) state.touched = [];
  let newRunners = [];
  runners.forEach(function (item) {
    if (state.touched.indexOf(item.name) == -1) {
      state.touched.push(item.name);
    }
    newRunners.push(ruleRunner(item.name, item.label, item.validator))
  });

  return newRunners.reduce((memo, runner) => {
    return Object.assign(memo, runner(state));
  }, {});
};