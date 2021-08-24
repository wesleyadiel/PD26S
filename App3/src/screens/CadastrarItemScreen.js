import React, {useState} from "react";
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
import DatePicker from 'react-native-datepicker'


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
	const { codigoParam, descricaoParam } = route.params;

	const { isDarkmode, setTheme } = useTheme();
	const [codigo, setCodigo] = useState(0);
	const [descricao, setDescricao] = useState('');
	const [marca, setMarca] = useState('');
	const [numeroSerie, setNumeroSerie] = useState('');
	const [dtCompra, setDtCompra] = useState(new Date());
	const [dtGarantia, setDtGarantia] = useState(new Date());
	const [setor, setSetor] = useState('');

    const entityRef = firebase.firestore().collection('entities');
    //const userID = props.extraData.id;

	async function salvar()
	{
		const item = {
			idItem: codigo
		}
	  alert("Item salvo");
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
					<TextInput editable={false} value={codigo}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Marca</Text>
					<TextInput disabled value={marca} onChangeText={(val) => setMarca(val)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Nº De Serie</Text>
					<TextInput disabled value={numeroSerie} onChangeText={(val) => setNumeroSerie(val)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Data da compra</Text>
					<DatePicker
							style={{width: 200}}
							date={dtCompra}
							mode="date"
							placeholder="Selecione a data de compra"
							format="DD-MM-YYYY"
							minDate="2016-05-01"
							maxDate="30-12-2999"
							confirmBtnText="Confirmar"
							cancelBtnText="Cancelar"
							customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
							}}
							onDateChange={(date) => {setDtCompra(date)}}
						/>
				</View>
				<View style={styles.field}>
					<Text>Data final da garantia</Text><DatePicker
							date={dtGarantia}
							mode="date"
							placeholder="Selecione a data de compra"
							format="DD-MM-YYYY"
							minDate="2016-05-01"
							maxDate="30-12-2999"
							confirmBtnText="Confirmar"
							cancelBtnText="Cancelar"
							
							onDateChange={(date) => {setDtGarantia(date)}}
						/>
				</View>
				<View style={styles.field}>
					<Text>Setor</Text>
					<TextInput disabled value={setor} onChangeText={(val) => setSetor(val)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Descrição</Text>
					<TextInput disabled value={descricao} onChangeText={(val) => setDescricao(val)}></TextInput>
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
