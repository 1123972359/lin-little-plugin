import * as vscode from "vscode";

export type ShortCutParams = {
  command: string;
  callback: (...args: any[]) => any;
};

export class ShortCut {
  private _shortCuts: ShortCutParams[] = [];
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  use(fn: () => ShortCutParams | ShortCutParams[]) {
    const res = fn();
    if (Array.isArray(res)) {
      this._shortCuts.push(...res);
    } else {
      this._shortCuts.push(res);
    }
    return this;
  }

  create() {
    console.log(this._shortCuts);
    const disposable = this._shortCuts.map((item) =>
      vscode.commands.registerCommand(item.command, item.callback)
    );
    this._context.subscriptions.push(...disposable);
  }
}
