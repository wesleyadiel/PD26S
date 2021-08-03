import React, { Component } from "react";
import { View, Linking, Image, FlatList, StyleSheet, Text, Alert } from "react-native";
import * as firebase from "firebase";
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor, TextInput
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 paddingTop: 22,
	 margin: 20,
	 borderRadius: 10,
	 backgroundColor: "#CBCACA",
	 flex: 1,
	},
	field: {
	  fontSize: 22,
	  height: 44,
	  borderBottomWidth: 1,
	  marginLeft: 10,
	  marginRight: 10,
	  textAlign: 'left',
	  marginBottom:40
	}
  });
  

  export default function ({ navigation })
  {
	const { codigo , descricao } = "";
	const { isDarkmode, setTheme } = useTheme();

	async function buscarItem()
	{
		alert("Buscando item...");
	}

	async function abrirCamera()
	{
		alert("Abrindo camera...");
	}

	return (
		<Layout>
		<TopNav
		  leftContent={
			<Ionicons
			  name={"arrow-back"}
			  size={20}
			  color={isDarkmode ? themeColor.white100 : themeColor.dark}
			  onPress={() => { navigation.pop() }}
			/>}
		  middleContent="Lançamento"
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
			<View style={styles.container}>
				
				<Image
				resizeMode="contain"
				style={{
					alignContent:"center",
					alignItems:"center",
					height: 280,
					width: 360,
				}}
				source={require("../../assets/scan_qrcode.png")}/>
			</View>

				<View style={styles.field}>
					<Text>Código do Item</Text>
					<TextInput value={codigo}></TextInput>
				</View>
			
			<View>
			<Button
				style={{ margin: 10, marginTop: -10, marginBottom: 15,
					justifyContent: "end" }}
				text="Buscar item"
				type="outline"
				onPress = {() => {
						buscarItem();
					}
				}
			/>

			<Button
				style={{ margin: 10, marginTop: -10, 
					justifyContent: "end" }}
				text="Ler QRCode"
				type="outline"
				onPress = {() => {
						abrirCamera();
					}
				}
			/>
			</View>
		</Layout>
	);
}
