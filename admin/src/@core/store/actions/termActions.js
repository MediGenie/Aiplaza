export const SAVE = "SAVE";

export const termActionCreator = {
  Save: (termInfo) => {
    return {
      type: SAVE,
      payload: termInfo,
    };
  },
};
