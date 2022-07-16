import * as vscode from "vscode";
import * as Handlebars from "handlebars";
import { promises } from "fs";
import logError from "../utils/logError";
import logSuccess from "../utils/logSuccess";

type Input = {
  name: string;
  path: string;
};

const createComponentTextFromTemplate = async (): Promise<string> => {
  const template = await promises.readFile(
    `${__dirname}/templates/component.handlebars`,
    "utf-8"
  );
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({});
};

const createFolderAndFile = async (
  folderName: string,
  fileNameWithExtension: string,
  text: string
): Promise<void> => {
  await promises.mkdir(folderName);
  await promises.writeFile(`${folderName}/${fileNameWithExtension}`, text);
};

const toto = async ({ name, path }: Input): Promise<void> => {
  const folderName = `${path}/${name}`;
  const fileNameWithExtension = "index.tsx";
  const text = await createComponentTextFromTemplate();
  await createFolderAndFile(folderName, fileNameWithExtension, text);
};

const createReactComponent = async (uri: vscode.Uri) => {
  const path = uri.fsPath;

  if (!(await promises.lstat(path)).isDirectory()) {
    logError(`No component has been created because ${path} is not a folder.`);
    return;
  }

  const name = await vscode.window.showInputBox();

  if (!name) {
    logSuccess("No component has been created (abort by user).");
    return;
  }

  try {
    await toto({ name, path });
    logSuccess(`${name} has been generated successfully.`);
  } catch (error) {
    logError(`Something went wrong +_+ ${String(error)}`);
  }
};

export default createReactComponent;
