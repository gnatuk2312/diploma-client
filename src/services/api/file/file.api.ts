import axios from "@/config/axios/base-instance";

import { FileInterface } from "@/interfaces/models.interface";
import { UploadFileArgumentsInterface } from "./file.types";

export const getAllFilesRequest = (): Promise<FileInterface[]> => {
  return axios.get("/files");
};

export const uploadFileRequest = (
  args: UploadFileArgumentsInterface
): Promise<FileInterface> => {
  const { body } = args;

  return axios.post("/files/upload", body);
};
