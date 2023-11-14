import * as vscode from "vscode";
import { To, TranslateStore, http4Translate } from ".";
import { SelectionUtils, ShortCutParams } from "../common";

export namespace TranslatePlugins {
  export const install = (): ShortCutParams[] => {
    return [
      // 翻译英文
      {
        command: "lin-little-plugin.translate2En",
        async callback() {
          if (await checkLogin()) {
            return;
          }
          await translateCallback("en");
        },
      },
      // 翻译中文
      {
        command: "lin-little-plugin.translate2Zh",
        async callback() {
          if (await checkLogin()) {
            return;
          }
          await translateCallback("zh");
        },
      },
    ];
  };

  /** 输入appid和secret */
  async function inputData() {
    const appid = await vscode.window.showInputBox({
      title: "appid",
      prompt: "appid?",
      validateInput(value) {
        if (!value) {
          return "请输入appid";
        }
      },
    });
    const secret = await vscode.window.showInputBox({
      title: "secret",
      prompt: "secret?",
      validateInput(value) {
        if (!value) {
          return "请输入密钥";
        }
      },
    });
    if (!appid || !secret) {
      return true;
    }
    TranslateStore.set(TranslateStore.StoreKey.APPID, appid);
    TranslateStore.set(TranslateStore.StoreKey.SECRET, appid);
    return false;
  }

  /** 检查appid和secret */
  async function checkLogin() {
    const { appid, secret } = TranslateStore.get();
    console.log(`----->`, appid, secret);
    if (!appid || !secret) {
      return await inputData();
    }
    return false;
  }

  /**
   * 展示结果
   */
  async function translateCallback(to: To) {
    const text = SelectionUtils.getText(SelectionUtils.get());
    if (!text) {
      return;
    }
    const transformText = tranformHump4En(text);
    const res = await http4Translate(transformText, to);
    if (!res) {
      return;
    }
    const value = res.trans_result
      .reduce((p, c) => p.concat(c.dst), [] as string[])
      .join(",");
    vscode.window.showInputBox({ value });
  }

  /**
   * 将英文驼峰分开
   * @example
   * ```js
   * helloBaby -> hello Baby
   * ```
   */
  function tranformHump4En(text: string) {
    const res: string[] = [];
    let start = 0;
    let end = 0;
    while (end < text.length) {
      if (text[end] !== " " && text[end] === text[end].toUpperCase()) {
        res.push(text.slice(start, end));
        start = end++;
        continue;
      }
      end++;
    }
    res.push(text.slice(start, end));
    return res.join(" ");
  }
}
