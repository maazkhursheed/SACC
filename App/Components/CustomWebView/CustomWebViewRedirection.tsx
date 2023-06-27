import React, { useEffect, useState } from "react";
import AppConfig from "../../Config/AppConfig";
import { encodingBase64 } from "../../Lib/ProfileHelper";
import { getPassword } from "./../../utils";
import CustomWebView from "./CustomWebView";

interface OwnProps {
  url?: any;
  closeSheet?: (p: any) => void | undefined;
  onStatechanges?: (data: object) => void;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const CustomWebViewRedirection: React.FunctionComponent<Props> = ({ url = "", closeSheet, onStatechanges }: Props) => {
  const [pass, getPass] = useState();
  const [pdpWebview, setPDPWebView] = useState(false);

  useEffect(() => {
    (async () => {
      const passwordVal = await getPassword();
      if (passwordVal) {
        getPass(passwordVal);
      }
    })();
  }, []);

  useEffect(() => {
    if (url) {
      setPDPWebView(true);
    }
  }, [url]);
  const closelocalSheet = () => {
    setPDPWebView(false);
    closeSheet("");
  };
  return (
    <>
      {pdpWebview && pass && (
        <CustomWebView
          source={{
            uri: AppConfig.WEB_VIEW_URL + url,
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={pdpWebview}
          onStatechanges={onStatechanges}
          closeSheet={closelocalSheet}
          isHeader={true}
        />
      )}
    </>
  );
};

export default CustomWebViewRedirection;
