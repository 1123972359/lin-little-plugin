import * as vscode from "vscode";

export namespace SelectionUtils {
  export const get = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return null;
    }
    return editor.selection;
  };

  /**
   * 获取选中的文本
   */
  export const getText = (selection: vscode.Selection | null): string => {
    if (!selection) {
      return "";
    }
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selectedText = editor.document.getText(selection);
      return selectedText;
    }
    return "";
  };

  export const replace = (selection: vscode.Selection, newText: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, newText);
    });
  };

  export const insert = (text: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }
    const Ranges = editor.selections;
    const positionList: vscode.Position[] = [];
    Ranges.forEach((range) => {
      const position = new vscode.Position(
        range.start.line,
        range.start.character
      );
      positionList.push(position);
    });
    editor.edit((editBuilder) => {
      positionList.forEach((position) => {
        editBuilder.insert(position, text);
      });
    });
  };

  /** 换行 */
  export const insertLineAfter = () => {
    vscode.commands.executeCommand("editor.action.insertLineAfter");
  };
}
