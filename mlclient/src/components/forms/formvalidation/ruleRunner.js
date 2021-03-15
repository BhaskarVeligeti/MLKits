/* eslint-disable no-mixed-spaces-and-tabs,no-console,no-undef */
export const ruleRunner = (field, name, validations) => {
  // console.log("ruleRunner2","key:",field, "name :",name, "validations :",validations);
  //   validations.map((d,idx)=>{
  //     console.log("validations array ruleRunner2 :",d,"Index :",idx)
  // })

  return state => {
    for (let v of validations) {
      // console.log("ruleRunner2 loop",state,field,"state[field] :",state[field]);

      let errorMessageFunc = v(state[field], name);
      if (errorMessageFunc) {
        return { [field]: errorMessageFunc };
      }
    }
    return null;
  };
};
export const run = (state, runners) => {
  return runners.reduce((memo, runner) => {
    // console.log("in  run--------------------------------------",memo);
    return Object.assign(memo, runner(state));
  }, {});
};
