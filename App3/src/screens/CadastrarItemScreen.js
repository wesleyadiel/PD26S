import React from "react";
import { View, Linking, Image, FlatList, StyleSheet, Text, Alert} from "react-native";
import * as firebase from "firebase";
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor, TextInput, Picker
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";


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
	  margin: 10,
	  fontSize: 22,
	  height: 44,
	  borderBottomWidth: 1,
	  marginLeft: 10,
	  marginRight: 10,
	  textAlign: 'left',
	}
  });
  
  async function salvar()
  {
	alert("Item salvo");
  }



  export default function ({ route, navigation }) {
	const { codigo, descricao } = route.params;

	const { isDarkmode, setTheme } = useTheme();



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
		  middleContent="Cadastro de Item"
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
				style={styles.container}
			>
				<View style={styles.field}>
					<Text>Código</Text>
					<TextInput editable={false}>{codigo}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Marca</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Nº De Serie</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Data da compra</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Data final da garantia</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Setor</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
				<View style={styles.field}>
					<Text>Descrição</Text>
					<TextInput disabled>{descricao}</TextInput>
				</View>
			</View>
			
			<Button
				style={{ margin: 10, marginTop: -10,
					justifyContent: "end" }}
				text="Salvar"
				onPress={() => { 
					salvar();
				}}
				/>
		</Layout>
	);
}
