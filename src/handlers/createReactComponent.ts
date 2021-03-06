import * as Handlebars from "handlebars";
import { promises } from "fs";
import createFolder from "../utils/createFolder";
import createFile from "../utils/createFile";
import inputAndProceed, { ProceedFunction } from "../utils/inputAndProceed";

const loadTemplate = async (templatePath: string): Promise<string> => {
  const template = await promises.readFile(templatePath, "utf-8");
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({});
};

const createFileFromTemplate = async (
  folderName: string,
  fileNameWithExtension: string,
  templatePath: string
): Promise<void> => {
  const text = await loadTemplate(templatePath);
  await createFile(`${folderName}/${fileNameWithExtension}`, text);
};

const proceed: ProceedFunction = async ({ path, name }) => {
  const folderName = `${path}/${name}`;
  await createFolder(folderName);
  await createFileFromTemplate(
    folderName,
    "index.tsx",
    `${__dirname}/templates/component/index.tsx.handlebars`
  );
};

const createReactComponent = inputAndProceed(proceed);

export default createReactComponent;
