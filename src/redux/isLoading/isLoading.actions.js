export const isLoadingActive = (data) => ({
  type: "LOADER_SHOW",
  payload: data,
});
export const isLoadingInactive = (data) => ({
  type: "LOADER_HIDE",
  payload: data,
});
