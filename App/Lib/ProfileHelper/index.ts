import base64 from "react-native-base64";

export const encodingBase64 = (name: string, pass: string) => {
  if (name && pass) {
    return base64.encode(name + ":" + pass);
  } else {
    return undefined;
  }
};

export const returnBearer = (token: string) => {
  return "Bearer " + token;
};
