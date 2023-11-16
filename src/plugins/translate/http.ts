import axios from "axios";
import md5 from "md5";
import FormData from "form-data";
import * as vscode from "vscode";
import { TranslateStore } from ".";

export type To = "en" | "zh";

export type Http4TranslateResponse = {
  from: string;
  to: To;
  trans_result: { src: string; dst: string }[];
};

/**
 * 发起翻译请求
 *
 * @param text 文本
 * @param to 翻译语言
 */
export const http4Translate = (
  text: string,
  to: To = "en"
): Promise<Http4TranslateResponse | undefined> => {
  const { appid, secret } = TranslateStore.get();
  const salt = Math.random();
  const sign = md5(appid + text + salt + secret);
  const fd = new FormData();
  fd.append("q", text);
  fd.append("from", "auto");
  fd.append("to", to);
  fd.append("appid", appid);
  fd.append("salt", salt);
  fd.append("sign", sign);
  return axios({
    method: "post",
    url: "https://fanyi-api.baidu.com/api/trans/vip/translate",
    data: fd,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => {
      console.log("Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      vscode.window.showInformationMessage("翻译报错", error);
    });
};
