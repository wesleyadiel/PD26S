import React from "react";
import { View, Linking, Image } from "react-native";
import * as firebase from "firebase";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={{ marginTop: 5 }}>
          <SectionContent>
          <Image
              resizeMode="contain"
              style={{
                alignContent:"center",
                height: 220,
                width: 320,
              }}
              source={require("../../assets/utfpr_logo.png")}
            />
              <View
				        style={{
					        alignItems: 'center',
				        }}
			        >
				      <Text>Gerenciamento de patrimônio</Text>
			        </View>
            <Button
              style={{ marginTop: 5 }}
              text="Itens"
              onPress={() => { 
                navigation.navigate("ItensScreen");
               }}
            />
            <Button
              text="Inutilizar Item"
              onPress={() => {
                navigation.navigate("InutilizarItemScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
          
            <Button
              text="Lançar Item"
              onPress={() => {
                navigation.navigate("LancarItemScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text="Estoque"
              onPress={() => {
                navigation.navigate("EstoqueItemScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              status="danger"
              text="Sair"
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
