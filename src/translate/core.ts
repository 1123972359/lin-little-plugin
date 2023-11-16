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
          const value = await translateCallback("en");
          showInputBox({ value: transformEnValue2Hamp(value) });
        },
      },
      // 翻译中文
      {
        command: "lin-little-plugin.translate2Zh",
        async callback() {
          if (await checkLogin()) {
            return;
          }
          const value = await translateCallback("zh");
          showInputBox({ value });
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
      return "";
    }
    const transformText = transformEnText(text);
    console.log(`transformText --->`, transformText);
    const res = await http4Translate(transformText, to);
    if (!res) {
      return "";
    }
    const value = res.trans_result
      .reduce((p, c) => p.concat(c.dst), [] as string[])
      .join(",");
    return value;
  }

  function showInputBox(params: { value?: string }) {
    const { value } = params;
    if (!value) {
      return;
    }
    vscode.window.showInputBox({ value });
  }

  /**
   * 处理英文,转换成更好去翻译的格式
   *
   * @example
   * - 驼峰
   * ```js
   * helloBaby -> hello Baby
   * ```
   * - 下划线
   * ```js
   * hello_baby -> hello baby
   * ```
   *
   * @example
   * `LOAD_TIME_CanSearch` 翻译结果为 `加载时间可以搜索`
   */
  function transformEnText(text: string) {
    text = text.replaceAll("_", " ");

    function isLower(t: string) {
      return t && t === t.toLowerCase();
    }

    const res: string[] = [""];
    let end = 0;
    let cur = "";
    let next = "";
    while (end <= text.length) {
      cur = text[end];
      next = text[end + 1];
      if (isLower(cur)) {
        res[res.length - 1] += cur;
        if (!isLower(next)) {
          res.push(next);
          end++;
        }
        end++;
        continue;
      }
      res[res.length - 1] += cur || "";
      end++;
    }
    return res.join(" ");
  }

  /**
   * 转换英文变成驼峰
   */
  function transformEnValue2Hamp(text: string) {
    const [f, ...r] = text.split(" ");
    return r.reduce(
      (pre, cur) => {
        const [first, ...rest] = cur;
        return (pre += first.toUpperCase() + rest.join(""));
      },
      f.split("").reduce((pre, cur) => {
        const [first, ...rest] = cur;
        return (pre += first.toLowerCase() + rest.join(""));
      }, "")
    );
  }
}
