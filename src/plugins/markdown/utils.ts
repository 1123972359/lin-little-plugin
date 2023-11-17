export namespace MarkdownUtils {
  export const RN = "\r\n";

  export const createTableHeader = (col: string) => {
    const temp1 = "| header ";
    const temp2 = "| -- ";
    const arr1 = new Array(Number(col)).fill("").map(() => temp1);
    const arr2 = new Array(Number(col)).fill("").map(() => temp2);
    return [arr1.join("") + "|" + RN, arr2.join("") + "|" + RN].join("");
  };

  export const createTableContent = (row: string, col: string) => {
    const temp = "| content ";
    const arr = new Array(Number(col)).fill("").map(() => temp);
    return new Array(Number(row))
      .fill("")
      .map(() => arr.join("") + "|" + RN)
      .join("");
  };
}
