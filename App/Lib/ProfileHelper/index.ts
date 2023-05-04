import base64 from "react-native-base64";

export const encodingBase64 = (name: string, pass: string) => {
  return base64.encode(name + ":" + pass);
};
