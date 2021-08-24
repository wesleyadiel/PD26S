import React, { Component, useState } from "react";
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
	const { isDarkmode, setTheme } = useTheme();
	const [codigo, setCodigo] = useState(0);
	const [descricao, setDescricao] = useState('Carregando...');
	const [keyParam, setKeyParam] = useState(0);
	const [qtdEstoque, setQtdEstoque] = useState(0);

	async function buscarItem()
	{
		const fetchData = async () => {
			let itens = await firebase.database().ref('item');
			let encontrou = false;
			await itens.once('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					if(parseInt(childData.codigo) == parseInt(codigo) && !encontrou)
					{
						setKeyParam(childKey);
						setDescricao(childData.descricao);
						setQtdEstoque(childData.qtdEstoque)
						encontrou = true;
					}
				});
			});

			if (encontrou)
			{
				alert('Item encontrado!');
			}
			else
			{
				alert('Item não encontrado!');
			}
		};

		fetchData();
	}

	async function abrirCamera()
	{
		alert("Abrindo camera...");
	}

	async function lancar()
	{
		if(!keyParam)
		{
			alert("Item não informado!");
			return;
		}

		const saldoAtualizado = (parseInt(qtdEstoque) + 1);
		const fetchData = async () => {
			let itens = await firebase.database().ref('item');
			firebase.database().ref().child(`/item/${keyParam}`).update({
				qtdEstoque: saldoAtualizado
			});
		};

		fetchData();
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
		  middleContent="Lançamento de item"
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
					<Text>Código do Item: </Text>
					<TextInput onChangeText={(texto) => setCodigo(texto)} value={codigo}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Nome: {descricao}</Text>
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
				style={{ margin: 10, marginTop: -10, marginBottom: 15,
					justifyContent: "end" }}
				text="Ler QRCode"
				type="outline"
				onPress = {() => {
						abrirCamera();
					}
				}
			/>
			
			<Button
				style={{ margin: 10, marginTop: -10, marginBottom: 15,
					justifyContent: "end" }}
				text="Lançar"
				type="outline"
				status="success"
				onPress = {() => {
						lancar();
					}
				}
			/>
			</View>
		</Layout>
	);
}
