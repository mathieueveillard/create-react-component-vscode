import * as vscode from "vscode";
import handler from "./handler";
import { promises } from "fs";
import logSuccess from "./utils/logSuccess";
import logError from "./utils/logError";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "create-react-component.generate",
    async (uri: vscode.Uri) => {
      const path = uri.fsPath;

      if (!(await promises.lstat(path)).isDirectory()) {
        logError(
          `No component has been created because ${path} is not a folder.`
        );
        return;
      }

      const name = await vscode.window.showInputBox();

      if (!name) {
        logSuccess("No component has been created (abort by user).");
        return;
      }

      try {
        await handler({ name, path });
        logSuccess(`${name} has been generated successfully.`);
      } catch (error) {
        logError(`Something went wrong +_+ ${String(error)}`);
      }
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
