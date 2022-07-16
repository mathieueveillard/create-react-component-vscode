import * as vscode from "vscode";
import createReactComponent from "./handlers/createReactComponent";

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    "create-react-component.generate",
    createReactComponent
  );
  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
