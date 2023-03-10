import {useCollapsibleHeader, UseCollapsibleOptions} from "react-navigation-collapsible";
import useColorScheme from "../hooks/useColorScheme";
import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {NativeScrollEvent, NativeSyntheticEvent} from "react-native";

export default function useCollapsibleHeaderMixin(scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void = () => {}, collapsibleOptions: Partial<UseCollapsibleOptions> = {}) {
  const colorScheme = useColorScheme();
  // disableExpoTranslucentStatusBar();  // At least now it's the wrong behavior consistently (Expo go & dev build)

  const options: UseCollapsibleOptions = {
    navigationOptions: {
      ...collapsibleOptions.navigationOptions,
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.card : DefaultTheme.colors.card,
        ...collapsibleOptions.navigationOptions?.headerStyle
      },
    },
    config: collapsibleOptions.config,
  };
  const {
    onScrollWithListener /* Event handler creator */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
  } = useCollapsibleHeader(options);

  const onScroll = onScrollWithListener(scrollHandler);
  // CollapsibleHeader docs: https://github.com/benevbright/react-navigation-collapsible

  return {
    onScroll,
    contentContainerStyle: { paddingTop: containerPaddingTop },
    scrollIndicatorInsets: { top: scrollIndicatorInsetTop },
  };
}
