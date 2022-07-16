import * as vscode from "vscode";

const logError = (error: string): void => {
  console.error(error);
  vscode.window.showInformationMessage(error);
};

export default logError;
