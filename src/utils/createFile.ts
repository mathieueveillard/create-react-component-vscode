import { promises } from "fs";

const createFile = (path: string, text: string): Promise<void> => {
  return promises.writeFile(path, text);
};

export default createFile;
