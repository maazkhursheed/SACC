import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, Modal, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./CustomWebViewStyles";
interface OwnProps {
  source?: any;
  title?: string;
  closeSheet?: () => void;
  onStatechanges?: (data: object) => void;
  visible?: boolean;
  isHeader?: boolean;
}

interface StateProps {
  window: any;
}

type Props = StateProps & OwnProps;

const CustomWebView: React.FunctionComponent<Props> = ({ source = "", title = "", closeSheet, onStatechanges, visible, isHeader, window }: Props) => {
  const navigation = useNavigation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const webviewRef = React.useRef<WebView>(null);
  const refresh = React.useCallback(() => webviewRef.current?.reload(), [webviewRef]);
  const webViewgoback = React.useCallback(() => webviewRef.current?.goBack(), [webviewRef]);
  const webViewNext = React.useCallback(() => webviewRef.current?.goForward(), [webviewRef]);

  const LoadingIndicatorView = () => {
    return <ActivityIndicator color="#009b88" size="large" style={styles.ActivityIndicatorStyle} />;
  };

  const onMessage = (event: WebViewMessageEvent) => {
    console.log("onMessage event: ", event);
  };

  const onNavigationStateChange = event => {
    setCanGoBack(event?.canGoBack);
    setCanGoForward(event?.canGoForward);
    setCurrentUrl(event?.url);
    onStatechanges(event);
  };

  return (
    <Modal visible={visible} animationType={"slide"} transparent={true} onRequestClose={closeSheet}>
      <SafeAreaView style={styles.contentContainer}>
        {isHeader === false ? (
          <></>
        ) : (
          <STCHeader
            title={title ? title : ""}
            showHorizontalLine={false}
            titleStyle={title ? styles.headerTitleStyle : {}}
            style={[{ paddingVertical: 10 }]}
            leftItem={
              <TouchableOpacity onPress={closeSheet} {...accessibility("leftItemBtn")}>
                <Text style={styles.cancelStyle}>{"Cancel"}</Text>
              </TouchableOpacity>
            }
            rightItem={
              <TouchableOpacity style={{}} onPress={refresh} {...accessibility("rightItemBtn")}>
                <Text style={styles.reloadStyle}>{"Reload"}</Text>
              </TouchableOpacity>
            }
          />
        )}
        {canGoBack || canGoForward ? (
          <STCHeader
            headerContainerStyle={{ paddingBottom: 10 }}
            leftItem={
              canGoBack ? (
                <TouchableOpacity onPress={webViewgoback} {...accessibility("rightPrevmBtn")}>
                  <Text style={styles.cancelStyle}>{"Previous"}</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
            rightItem={
              canGoForward ? (
                <TouchableOpacity onPress={webViewNext} {...accessibility("leftnextBtn")}>
                  <Text style={styles.cancelStyle}>{"Next"}</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
            showHorizontalLine={false}
          />
        ) : (
          <></>
        )}
        <WebView
          ref={webviewRef}
          source={{ uri: source?.uri, headers: source?.headers }}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={onMessage}
          onNavigationStateChange={event => onNavigationStateChange(event)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default CustomWebView;
