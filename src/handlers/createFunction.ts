import * as Handlebars from "handlebars";
import { promises } from "fs";
import createFolder from "../utils/createFolder";
import createFile from "../utils/createFile";
import inputAndProceed, { ProceedFunction } from "../utils/inputAndProceed";

const loadTemplate = async (
  templatePath: string,
  functionName: string
): Promise<string> => {
  const template = await promises.readFile(templatePath, "utf-8");
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ functionName });
};

const createFileFromTemplate = async (
  folderName: string,
  fileNameWithExtension: string,
  templatePath: string,
  functionName: string
): Promise<void> => {
  const text = await loadTemplate(templatePath, functionName);
  await createFile(`${folderName}/${fileNameWithExtension}`, text);
};

const proceed: ProceedFunction = async ({ path, name }) => {
  const folderName = `${path}/${name}`;
  await createFolder(folderName);
  await createFileFromTemplate(
    folderName,
    "index.ts",
    `${__dirname}/templates/function/index.ts.handlebars`,
    name
  );
  await createFileFromTemplate(
    folderName,
    "index.spec.ts",
    `${__dirname}/templates/function/index.spec.ts.handlebars`,
    name
  );
};

const createFunction = inputAndProceed(proceed);

export default createFunction;
