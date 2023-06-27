import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, Modal, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import STCHeader from "~root/Components/STCHeader/STCHeader";
import { accessibility } from "~root/Lib/DataHelper";
import { localizeImage } from "../../i18n";
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
  const { t } = useTranslation();
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

  const onMessage = (event: WebViewMessageEvent) => {};

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
            style={styles.stgHeader}
            headerContainerStyle={styles.headerContainerStyle}
            leftItem={
              <TouchableOpacity style={styles.closeBtnStyle} onPress={refresh} {...accessibility("rightItemBtn")}>
                <Image resizeMode={"contain"} source={localizeImage("WebReloadIcon")} />
              </TouchableOpacity>
            }
            rightItem={
              <TouchableOpacity style={styles.closeBtnStyle} onPress={closeSheet} {...accessibility("leftItemBtn")}>
                <Image resizeMode={"contain"} source={localizeImage("WebCloseIcon")} />
              </TouchableOpacity>
            }
            rightItemStyle={{ minWidth: 0 }}
            leftItemStyle={{ minWidth: 0 }}
          />
        )}
        {canGoBack || canGoForward ? (
          <STCHeader
            headerContainerStyle={styles.headerContainerStyle}
            leftItem={
              canGoBack ? (
                <TouchableOpacity onPress={webViewgoback} style={styles.nextTextBtn} {...accessibility("rightPrevmBtn")}>
                  <Image resizeMode={"contain"} source={localizeImage("WebBackIcon")} />
                  <View style={styles.septaror}></View>
                  <Text style={styles.cancelStyle}>{t("Previous")}</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
            rightItem={
              canGoForward ? (
                <TouchableOpacity style={styles.nextTextBtn} onPress={webViewNext} {...accessibility("leftnextBtn")}>
                  <Text style={styles.cancelStyle}>{t("Next")}</Text>
                  <View style={styles.septaror}></View>
                  <Image resizeMode={"contain"} source={localizeImage("WebNextIcon")} />
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
