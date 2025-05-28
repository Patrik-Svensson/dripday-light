import React, { useState, useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FeedScreen } from "./screens/FeedScreen";
import { ExploreScreen } from "./screens/ExploreScreen";
import { PostViewScreen } from "./screens/PostViewScreen";
import { SignupScreen } from "./screens/SignupScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { ProductScreen } from "./screens/ProductScreen";
import { LikesScreen } from "./screens/LikesScreen";
import { StyleboardScreen } from "./screens/StyleboardScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { ChangePasswordScreen } from "./screens/ChangePasswordScreen";
import { ChangeEmailScreen } from "./screens/ChangeEmailScreen";
import { ForgotPasswordScreen } from "./screens/ForgotPasswordScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SettingsIcon from "../assets/icons/setting.svg";
import {
  faHome,
  faSearch,
  faSignInAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Likes: undefined;
  PostView: { post: any };
  Styleboard: { styleboard: any };
  Feed: undefined;
  Explore: undefined;
  Product: { item: any };
  Settings: undefined;
  "Change Password": undefined;
  "Change Email": undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function LoginStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function LikesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Likes"
        component={LikesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostView"
        component={PostViewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Styleboard"
        component={StyleboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function FeedStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostView"
        component={PostViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function ExploreStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostView"
          component={PostViewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  function SettingsStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Change Password"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Change Email"
          component={ChangeEmailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              switch (route.name) {
                case "FeedStack":
                  return (
                    <FontAwesomeIcon icon={faHome} size={30} color={color} />
                  );
                case "ExploreStack":
                  return (
                    <FontAwesomeIcon icon={faSearch} size={30} color={color} />
                  );
                case "Login":
                  return (
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      size={30}
                      color={color}
                    />
                  );
                case "SettingsStack":
                  return <SettingsIcon width={30} height={30} fill={color} />;
                case "LikesStack":
                  return (
                    <FontAwesomeIcon icon={faHeart} size={30} color={color} />
                  );
                default:
                  return (
                    <FontAwesomeIcon icon={faHome} size={30} color={color} />
                  );
              }
            },

            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "black",
            },
          })}
        >
          <Tab.Screen
            name="FeedStack"
            component={FeedStackScreen}
            options={{
              tabBarStyle: {
                backgroundColor: "black",
                paddingBottom: 5,
                height: 60,
                position: "absolute",
                borderTopWidth: 0,
              },
            }}
          />
          <Tab.Screen
            name="ExploreStack"
            component={ExploreStackScreen}
            options={{
              tabBarStyle: {
                backgroundColor: "black",
                paddingBottom: 5,
                height: 60,
                position: "absolute",
                borderTopWidth: 0,
              },
            }}
          />
          {isAuthenticated && (
            <Tab.Screen
              name="LikesStack"
              component={LikesStackScreen}
              options={{
                tabBarStyle: {
                  backgroundColor: "black",
                  paddingBottom: 5,
                  height: 60,
                  position: "absolute",
                  borderTopWidth: 0,
                },
              }}
            />
          )}
          {isAuthenticated ? (
            <Tab.Screen
              name="SettingsStack"
              component={SettingsStackScreen}
              options={{
                tabBarStyle: {
                  backgroundColor: "black",
                  paddingBottom: 5,
                  height: 60,
                  position: "absolute",
                  borderTopWidth: 0,
                },
              }}
            />
          ) : (
            <Tab.Screen
              name="Login"
              component={LoginStackScreen}
              options={{
                tabBarStyle: {
                  backgroundColor: "black",
                  paddingBottom: 5,
                  height: 60,
                  position: "absolute",
                  borderTopWidth: 0,
                },
              }}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
