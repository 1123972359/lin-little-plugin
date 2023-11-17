import * as vscode from "vscode";

export type CommandParams = {
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
    console.log(this._command);
    const disposable = this._command.map((item) =>
      vscode.commands.registerCommand(item.command, item.callback)
    );
    this._context.subscriptions.push(...disposable);
  }
}
