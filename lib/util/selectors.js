/**
 * ------------------------------------------------------------------
 * saga selectors
 * ------------------------------------------------------------------
 */
export const moduleNameSelector = state => state.smart.common.moduleName;
export const modeSelector = state => state.smart.common.mode;
export const queryObjSelector = moduleName => state => state.smart.data[moduleName].queryObj;

/**
 * ------------------------------------------------------------------
 * connect selectors
 * ------------------------------------------------------------------
 */
export const magicSelector = moduleName => (state) => {
  const { smart: { common: { mode, editData }, data } } = state;
  const queryObj = data[moduleName] ? data[moduleName].queryObj : {};
  const moduleData = data[moduleName] ? data[moduleName].moduleData : [];
  return ({
    mode,
    editData,
    queryObj,
    moduleData
  });
};
