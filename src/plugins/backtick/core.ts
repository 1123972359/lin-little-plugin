import { SelectionUtils, CommandParams } from "../../common";

export namespace BacktickCommand {
  export const install = (): CommandParams => {
    return {
      command: "lin-little-plugin.backtick",
      async callback() {
        backtick();
      },
    };
  };

  function backtick() {
    const selection = SelectionUtils.get();
    const text = SelectionUtils.getText(selection);
    if (!text || !selection) {
      return;
    }
    let newText = "";
    const len = text.length;
    const head = text[0];
    const tail = text[len - 1];
    if ((head === `'` || head === `"`) && (tail === `'` || tail === `"`)) {
      newText = "`" + text.substring(1, len - 1) + "`";
    } else {
      newText = "`" + text + "`";
    }
    SelectionUtils.replace(selection, newText);
  }
}
