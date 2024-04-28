import { readdir, writeFile } from "fs";
import { promisify } from "util";
import { join as _join } from "path";

export namespace FileUtils {
  /**
   * 生成文件路径
   */
  export const join = (dir: string, fileName: string) => {
    return _join(dir, fileName);
  };

  export type GetFilesForDirOptions = {
    exclude?: string[];
  };

  /**
   * 得到某目录下的所有文件
   */
  export const getFilesForDir = async (
    dir: string,
    options?: GetFilesForDirOptions
  ) => {
    const { exclude } = options ?? {};
    const result = await promisify(readdir)(dir);
    return result
      .map((n) => n.split(".")[0])
      .filter((item) => !exclude?.includes(item));
  };

  /**
   * 写入文件
   */
  export const write = async (fileName: string, content: string) => {
    await promisify(writeFile)(fileName, content);
  };
}
