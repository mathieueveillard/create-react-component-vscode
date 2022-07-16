import * as vscode from "vscode";
import createFunction from "./handlers/createFunction";
import createReactComponent from "./handlers/createReactComponent";

export const activate = (context: vscode.ExtensionContext) => {
  const createReactComponentDisposable = vscode.commands.registerCommand(
    "create-react-component.generate",
    createReactComponent
  );

  const createFunctionDisposable = vscode.commands.registerCommand(
    "create-function.generate",
    createFunction
  );

  context.subscriptions.push(
    createReactComponentDisposable,
    createFunctionDisposable
  );
};

export const deactivate = () => {};
