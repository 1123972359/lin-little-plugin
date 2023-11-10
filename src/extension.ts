import * as vscode from "vscode";
import { TranslatePlugins } from "./translate";
import { ShortCut } from "./common";
import { TransformPlugins } from "./transofrm";

export function activate(context: vscode.ExtensionContext) {
  const shortCut = new ShortCut(context);
  shortCut.use(TranslatePlugins.install).use(TransformPlugins.install).create();
}

export function deactivate() {}
