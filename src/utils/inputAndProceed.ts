import * as vscode from "vscode";
import { promises } from "fs";
import logError from "./logError";
import logSuccess from "./logSuccess";

type Input = {
  name: string;
  path: string;
};

export type ProceedFunction = ({ name, path }: Input) => Promise<void>;

const inputAndProceed =
  (proceed: ProceedFunction) => async (uri: vscode.Uri) => {
    const path = uri.fsPath;

    if (!(await promises.lstat(path)).isDirectory()) {
      logError(`No file has been created because ${path} is not a folder.`);
      return;
    }

    const name = await vscode.window.showInputBox();

    if (!name) {
      logSuccess("No file has been created (abort by user).");
      return;
    }

    try {
      await proceed({ name, path });
      logSuccess(`${name} has been generated successfully.`);
    } catch (error) {
      logError(`Something went wrong +_+ ${String(error)}`);
    }
  };

export default inputAndProceed;
