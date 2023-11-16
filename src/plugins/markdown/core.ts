import { window } from "vscode";
import { SelectionUtils, ShortCutParams, sleep } from "../../common";

export namespace MarkdownShortCut {
  export const install = (): ShortCutParams[] => {
    return [
      {
        command: "lin-little-plugin.createMarkdownSnippets",
        async callback() {
          await showSelect4MarkdownFunction();
        },
      },
    ];
  };

  enum MarkdownFunctionOptions {
    TABLE = "table",
  }

  /**
   * 展示`markdown`的功能选择
   */
  async function showSelect4MarkdownFunction() {
    const options: string[] = Object.values(MarkdownFunctionOptions);
    const result = await window.showQuickPick(options, {
      placeHolder: "生成各种`markdown`语法",
    });
    switch (result) {
      case MarkdownFunctionOptions.TABLE:
        return MarkdownSnippets.inputTableSnippets();
      default:
        break;
    }
  }
}

const RN = "\r\n";

export namespace MarkdownSnippets {
  /** 注入`table`片段 */
  export async function inputTableSnippets() {
    const template = ["| 视频名字 | 视频链接 |", "| -- | -- |"];
    SelectionUtils.insert(RN + template.join(RN));
  }
}
