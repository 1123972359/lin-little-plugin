import * as vscode from "vscode";

export namespace TranslateStore {
  export enum StoreKey {
    APPID = "translate-store-appid",
    SECRET = "translate-store-secret",
  }

  export function get() {
    const configuration =
      vscode.workspace.getConfiguration("lin-little-plugin");
    const appid = configuration.get(StoreKey.APPID);
    const secret = configuration.get(StoreKey.SECRET);
    return { appid, secret };
  }

  export async function set(
    key: StoreKey,
    value: string,
    mode?: vscode.ConfigurationTarget
  ) {
    const configuration =
      vscode.workspace.getConfiguration("lin-little-plugin");
    await configuration.update(
      key,
      value,
      mode || vscode.ConfigurationTarget.Global
    );
  }
}
