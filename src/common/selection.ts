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
}
