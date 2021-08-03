import React from "react";
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
		  middleContent="Estoque"
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
				data={[
					{key: 1, descricao: 'Projetor', qtdEstoque: 45},
					{key: 2, descricao: 'Cadeira Aluno', qtdEstoque: 1200},
					{key: 3, descricao: 'Carteira Aluno', qtdEstoque: 1149},
					{key: 4, descricao: 'Mesa Professor', qtdEstoque: 225},
					{key: 5, descricao: 'Freezer', qtdEstoque: 9},
					{key: 6, descricao: 'Geladeira', qtdEstoque: 14},
					]}
				renderItem={({item}) =>
				<View>
						<Text style={styles.item}>
							{item.key} - {item.descricao} - Qtd. Estoque: {item.qtdEstoque.toFixed(3)}
		  				</Text>
				</View>}
			/>
			
            <Button
              style={{ marginLeft:10, marginRight:10 }}
              text="Lançar Item"
              onPress={() => { 
                navigation.navigate("LancarItemScreen");
               }}
            />

            <Button
              style={{ margin: 10 }}
              text="Inutilizar Item"
              onPress={() => { 
                navigation.navigate("InutilizarItemScreen");
               }}
            />
			</View>
		</Layout>
	);
}
