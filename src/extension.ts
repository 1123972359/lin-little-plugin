import * as vscode from "vscode";
import { ShortCut } from "./common";
import {
  MarkdownShortCut,
  TransformShortCut,
  TranslateShortCut,
} from "./plugins";

export function activate(context: vscode.ExtensionContext) {
  const shortCut = new ShortCut(context);
  shortCut
    .use(TranslateShortCut.install)
    .use(TransformShortCut.install)
    .use(MarkdownShortCut.install)
    .create();
}

export function deactivate() {}
