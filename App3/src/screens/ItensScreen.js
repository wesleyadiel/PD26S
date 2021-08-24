import React, { Component, useEffect }  from "react";
import { View, Linking, Image, FlatList, StyleSheet, Text } from "react-native";
import * as firebase from "firebase";
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 paddingTop: 22
	},
	item: {
	  padding: 10,
	  fontSize: 18,
	  height: 44,
	  borderBottomWidth: 1,
	  marginLeft: 10,
	  marginRight: 10,
	  textAlign: 'left',
	  alignItems: 'center', 
	  justifyContent: 'center'
	},
	icon: {
		textAlign: 'left',
		alignItems: 'center', 
		justifyContent: 'center'
	}
  });

  export default function ({ navigation }) {
	const { isDarkmode, setTheme } = useTheme();
	const [atualizarLista, setAtualizarLista] = useState(false);
	const [items, setItems] = useState([]);

	//Tentei colocar para atualizar os dados da lista quando voltasse a tela mas nao deu certo
	const atualizarDados = async () => {
		setAtualizarLista(false);
		let aux = [];
		let itens = await firebase.database().ref('item');
		itens.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				var childKey = childSnapshot.key;
				var childData = childSnapshot.val();
				aux.push({key: childSnapshot.key, codigo: childData.codigo, descricao: childData.descricao});
				setAtualizarLista(true);
			});
		});
		setItems(aux);
	}

	useEffect(() => {
		const fetchData = async () => {
			let aux = [];
			let itens = await firebase.database().ref('item');
			itens.once('value', (snapshot) => {
				snapshot.forEach((childSnapshot) => {
					var childKey = childSnapshot.key;
					var childData = childSnapshot.val();
					aux.push({key: childSnapshot.key, codigo: childData.codigo, descricao: childData.descricao});
					setAtualizarLista(true);
				});
			});
		  	setItems(aux);
		};

		fetchData();
	  }, []);

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
		  middleContent="Itens"
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
			<FlatList
			name="list"
				data={items}
				refreshing={atualizarLista}
				renderItem={({item}) =>
				<View>
						<Text style={styles.item} onPress={async () => { 
																await navigation.navigate("CadastrarItemScreen", {keyParam: item.key, codigoParam: item.codigo, descricaoParam: item.descricao});
																atualizarDados();
																}}>
							{item.codigo} - {item.descricao}
		  				</Text>
				</View>}
			/>
            <Button
              style={{ margin: 10 }}
              text="Cadastrar Item"
              onPress={async () => { 
				await navigation.navigate("CadastrarItemScreen", {codigo:'' , descricao:''});
				atualizarDados();
               }}
            />
			</View>
		</Layout>
	);
}
