import * as Handlebars from "handlebars";
import { promises } from "fs";

interface Input {
  name: string;
  path: string;
}

export default async function ({ name, path }: Input): Promise<void> {
  const folderName = `${path}/${name}`;
  const fileNameWithExtension = "index.tsx";
  const text = await createComponentTextFromTemplate();
  await createFolderAndFile(folderName, fileNameWithExtension, text);
}

async function createComponentTextFromTemplate(): Promise<string> {
  const template = await promises.readFile(
    `${__dirname}/templates/component/component.handlebars`,
    "utf-8"
  );
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({});
}

async function createFolderAndFile(
  folderName: string,
  fileNameWithExtension: string,
  text: string
): Promise<void> {
  await promises.mkdir(folderName);
  await promises.writeFile(`${folderName}/${fileNameWithExtension}`, text);
}
