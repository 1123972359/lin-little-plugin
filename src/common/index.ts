export * from "./selection";
export * from "./shortcut";

export const sleep = async (duration: number = 1000) => {
  return new Promise((r) => {
    const t = setTimeout(() => {
      r(void 0);
      clearTimeout(t);
    }, duration);
  });
};
