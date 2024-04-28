import * as vscode from "vscode";
import { CommandParams } from "../../common";
import { FileUtils } from "../../utils";

/** 导出`index.ts`命令 */
export namespace ExportIndexCommand {
  export const install = (): CommandParams[] => {
    return [
      {
        command: "lin-little-plugin.exportIndex",
        callback: run,
      },
    ];
  };

  async function genIndex(dir: string) {
    const files = await FileUtils.getFilesForDir(dir, { exclude: ["index"] });
    const fileName = FileUtils.join(dir, "index.ts");
    const content = files
      .map((item: string) => `export * from './${item}';`)
      .join("\n");
    await FileUtils.write(fileName, content);
  }

  async function run(uri: vscode.Uri) {
    const dirPath = uri.fsPath;
    await genIndex(dirPath);
  }
}
