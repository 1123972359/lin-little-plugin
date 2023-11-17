import { SelectionUtils, CommandParams } from "../../common";

export namespace TransformCommand {
  export const install = (): CommandParams => {
    return {
      command: "lin-little-plugin.transformUpper",
      async callback() {
        transformUpper();
      },
    };
  };

  function transformUpper() {
    const selection = SelectionUtils.get();
    const text = SelectionUtils.getText(selection);
    if (!text || !selection) {
      return;
    }
    let newText = "";
    if (text[0] === text[0].toUpperCase()) {
      newText = text.toLowerCase();
    } else {
      newText = text.toUpperCase();
    }
    SelectionUtils.replace(selection, newText);
  }
}
