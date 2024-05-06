import { window } from "vscode";
import { CommandParams } from "../../common";
import { MarkdownUtils } from "./utils";
import { SelectionUtils } from "../../utils";

export namespace MarkdownCommand {
  export const install = (): CommandParams[] => {
    return [
      {
        command: "lin-little-plugin.createMarkdownSnippets",
        async callback() {
          if (
            window.activeTextEditor &&
            window.activeTextEditor.document.languageId === "markdown"
          ) {
            await showSelect4MarkdownFunction();
          } else {
            window.showInformationMessage("只能在.md中执行");
          }
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

export namespace MarkdownSnippets {
  /** 注入`table`片段 */
  export async function inputTableSnippets() {
    const row = await window.showInputBox({
      title: "row",
      prompt: "多少行?",
      value: "3",
      validateInput(value) {
        if (!value) {
          return "请输入多少行";
        }
      },
    });
    const col = await window.showInputBox({
      title: "col",
      prompt: "多少列?",
      value: "3",
      validateInput(value) {
        if (!value) {
          return "请输入多少列";
        }
      },
    });
    const header = MarkdownUtils.createTableHeader(col || "0");
    const content = MarkdownUtils.createTableContent(row || "0", col || "0");
    SelectionUtils.insert(MarkdownUtils.RN + header + content);
  }
}
