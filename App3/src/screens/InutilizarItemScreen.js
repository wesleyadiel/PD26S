import React, {useState, useEffect} from "react";
import { View, Linking, Image, FlatList, StyleSheet, Text, Alert, Switch} from "react-native";
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
  
  export default function ({ route, navigation }) {
	const { keyParam, codigoParam, descricaoParam } = route.params;

	const { isDarkmode, setTheme } = useTheme();
	const [codigo, setCodigo] = useState(0);
	const [status, setStatus] = useState(true);

	const toggleSwitch = () => setStatus(previousState => !previousState);

    const entityRef = firebase.firestore().collection('entities');
	//const userID = props.extraData.id;
	
	useEffect(() => {
		const fetchData = async () => {
			await firebase.database()
			.ref(`/item/${(keyParam ? keyParam : 0)}`)
			.on('value', snapshot => {
				var childData = snapshot.val();
				console.log(keyParam);
				console.log(childData);
				if(childData)
				{
					setCodigo(childData.codigo);
					setStatus(childData.status);
				}
			});
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
					<Text>Código:</Text>
					<TextInput value={codigo}></TextInput>
				</View>
			<Button
				style={{ margin: 10, marginTop: -10, marginBottom: 15,
					justifyContent: "end" }}
				text="Buscar pelo código"
				type="outline"
				status="warning"
			/>
			<Button
				style={{ margin: 10, marginTop: -10, 
					justifyContent: "end" }}
				text="Ler QRCode"
				type="outline"
			/>
		</Layout>
	);
}
