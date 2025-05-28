declare module "@react-navigation/native" {
  import { NavigationContainer } from "@react-navigation/core";
  export { NavigationContainer };
  export * from "@react-navigation/core";
}

declare module "@react-navigation/stack" {
  import { createStackNavigator } from "@react-navigation/stack";
  export { createStackNavigator };
}
