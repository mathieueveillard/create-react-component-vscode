import * as vscode from "vscode";

export default function (error: string): void {
  console.error(error);
  vscode.window.showInformationMessage(error);
}
