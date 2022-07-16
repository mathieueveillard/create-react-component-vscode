import { promises } from "fs";

const createFolder = (folderName: string): Promise<void> => {
  return promises.mkdir(folderName);
};

export default createFolder;
