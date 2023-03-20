export const getBase64 = (picture: FileList): Promise<string> => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    let base64Image = "";

    let fileUpload = picture[0];
    reader.readAsDataURL(fileUpload);
    reader.onload = async (e: any) => {
      base64Image = e.target.result;
      resolve(base64Image);
    };
  });
};
