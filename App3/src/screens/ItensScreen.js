import React, { Component, useEffect } from "react";
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
	const items = [];
	
	useEffect(async () => {
		let itens = await firebase.database().ref('item');
		itens.once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
			  var childKey = childSnapshot.key;
			  var childData = childSnapshot.val();
			  itens.push({key:childData.codigo, descricao:childData.descricao});
			  // ...
			});
		  });
		itens.on('value', querySnapShot => {
			let data = querySnapShot.val() ? querySnapShot.val() : {};
			let itemsData = {...data};
			console.log(itemsData);
			/*itemsData.forEach(element => {
				console.log(element);
				itens.push({key:element.codigo, descricao:element.descricao});
			});*/
		  });
	});

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
				data={items}
				renderItem={({item}) =>
				<View>
						<Text style={styles.item} onPress={() => {navigation.navigate("CadastrarItemScreen", {codigo: item.key, descricao: item.descricao});}}>
							{item.key} - {item.descricao}
		  				</Text>
				</View>}
			/>
            <Button
              style={{ margin: 10 }}
              text="Cadastrar Item"
              onPress={() => { 
                navigation.navigate("CadastrarItemScreen", {codigo:'' , descricao:''});
               }}
            />
			</View>
		</Layout>
	);
}
