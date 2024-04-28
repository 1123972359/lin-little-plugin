import * as vscode from "vscode";

export type CommandParams =
  | vscode.Disposable
  | {
      command: string;
      callback: (...args: any[]) => any;
    };

export class Command {
  private _command: CommandParams[] = [];
  private _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  use(fn: () => CommandParams | CommandParams[]) {
    const res = fn();
    if (Array.isArray(res)) {
      this._command.push(...res);
    } else {
      this._command.push(res);
    }
    return this;
  }

  create() {
    const disposables = this._command.map((item) =>
      "command" in item
        ? vscode.commands.registerCommand(item.command, item.callback)
        : item
    );
    this._context.subscriptions.push(...disposables);
  }
}
