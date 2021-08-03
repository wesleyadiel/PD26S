import React, { useContext } from "react";
import firebase from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../provider/AuthProvider";

// Main
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

import Loading from "../screens/utils/Loading";
import ItensScreen from "../screens/ItensScreen";
import CadastrarItemScreen from "../screens/CadastrarItemScreen";
import InutilizarItemScreen from "../screens/InutilizarItemScreen";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyAWybngZhkoluPxnBFI9-Dr0UqBwiT3ajE",
  authDomain: "utfpr-8e0b2.firebaseapp.com",
  databaseURL: "https://utfpr-8e0b2-default-rtdb.firebaseio.com",
  projectId: "utfpr-8e0b2",
  storageBucket: "utfpr-8e0b2.appspot.com",
  messagingSenderId: "155275931636",
  appId: "1:155275931636:web:c661f0f5af61c49c9c13a1",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const AuthStack = createStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="ItensScreen" component={ItensScreen} />
      <MainStack.Screen name="CadastrarItemScreen" component={CadastrarItemScreen} />
      <MainStack.Screen name="InutilizarItemScreen" component={InutilizarItemScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
