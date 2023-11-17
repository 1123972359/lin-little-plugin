import * as vscode from "vscode";
import { Command } from "./common";
import { MarkdownCommand, TransformCommand, TranslateCommand } from "./plugins";

export function activate(context: vscode.ExtensionContext) {
  const command = new Command(context);
  command
    .use(TranslateCommand.install)
    .use(TransformCommand.install)
    .use(MarkdownCommand.install)
    .create();
}

export function deactivate() {}
