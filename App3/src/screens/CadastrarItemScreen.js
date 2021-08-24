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
	const { keyParam, codigoParam, descricaoParam } = route.params;

	const { isDarkmode, setTheme } = useTheme();
	const [codigo, setCodigo] = useState(0);
	const [status, setStatus] = useState(true);
	const [qtdEstoque, setqtdEstoque] = useState('');
	const [descricao, setDescricao] = useState('');
	const [marca, setMarca] = useState('');
	const [numeroSerie, setNumeroSerie] = useState('');
	const [dtCompra, setDtCompra] = useState(new Date());
	const [dtGarantia, setDtGarantia] = useState(new Date());
	const [categoria, setCategoria] = useState('');

	const toggleSwitch = () => setStatus(previousState => !previousState);

    const entityRef = firebase.firestore().collection('entities');
	//const userID = props.extraData.id;
	
	useEffect(() => {
		const fetchData = async () => {
			await firebase.database()
			.ref(`/item/${(keyParam ? keyParam : 0)}`)
			.on('value', snapshot => {
				var childData = snapshot.val();
				if(childData)
				{
					setCodigo(childData.codigo);
					setqtdEstoque(childData.qtdEstoque);
					setStatus(childData.status);
					setDescricao(childData.descricao);
					setMarca(childData.marca);
					setCategoria(childData.categoria);
					setNumeroSerie(childData.numeroSerie);
					setDtCompra(childData.dtCompra ? childData.dtCompra : new Date());
					setDtGarantia(childData.dtGarantia ? childData.dtGarantia : new Date());
					setqtdEstoque(childData.qtdEstoque);
				}
			});
		};

		fetchData();
	  }, []);

	async function cadastrarItem(){
		if (!keyParam || keyParam == undefined || keyParam == '')
		{
			if (codigo!== '' & descricao !== '')
			{
				let usuariosRef = await firebase.database().ref('item');
				let key = usuariosRef.push().key;
				
				usuariosRef.child(key).set({
					codigo: codigo,
					status: status,
					qtdEstoque: qtdEstoque,
					descricao: descricao,
					marca: marca,
					categoria: categoria,
					numeroSerie: numeroSerie,
					dtGarantia: dtGarantia,
					dtCompra: dtCompra
				});
			
				alert("Cadastro realizado com sucesso!")
				setCodigo('');
				setStatus('');
				setDescricao('');
				setMarca('');
				setNumeroSerie('');
				dtCompra('');
				dtGarantia('');
				setCategoria('');
				setqtdEstoque('');
			
				return;
			}
		
			alert("Preencha os dados!");
		}
		else
		{
			if (!codigo || codigo == '' || !descricao || descricao == '')
			{
				alert("Preencha os dados!");
				return;
			}
			
			firebase.database().ref().child(`/item/${keyParam}`).update({
				codigo: codigo,
				status: status,
				descricao: descricao,
				marca: marca,
				categoria: categoria,
				numeroSerie: numeroSerie,
				dtGarantia: dtGarantia,
				dtCompra: dtCompra,
				qtdEstoque: qtdEstoque
			});

			alert("Edição realizada com sucesso!")
			setCodigo('');
			setqtdEstoque('');
			setStatus('');
			setDescricao('');
			setMarca('');
			setNumeroSerie('');
			setDtCompra('');
			setDtGarantia('');
			setCategoria('');
		}
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
				<View style={{ margin: 10}}>
					<Text>Ativo:
					<Switch
					   style={{ marginTop: 5, marginBottom: 5}}
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={status ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={status}
      				/> </Text>
				</View>
				<View style={styles.field}>
					<Text>Código:</Text>
					<TextInput keyboardType="numeric" onChangeText={(texto) => setCodigo(texto)} value={codigo}></TextInput>
				</View>
				
				<View style={styles.field}>
					<Text>Descrição: </Text>
					<TextInput value={descricao} onChangeText={(texto) => setDescricao(texto)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Nº De Serie:</Text>
					<TextInput value={numeroSerie} onChangeText={(texto) => setNumeroSerie(texto)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Categoria:</Text>
					<TextInput value={categoria} onChangeText={(texto) => setCategoria(texto)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Marca: </Text>
					<TextInput value={marca} onChangeText={(texto) => setMarca(texto)}></TextInput>
				</View>
				<View style={styles.field}>
					<Text>Quantidade:</Text>
					<TextInput value={qtdEstoque} onChangeText={(texto) => setqtdEstoque(texto)}></TextInput>
				</View>

				<View>
					<Text style={{ margin: 10}}>Data da compra</Text>
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
				<View>
					<Text style={{ margin: 10}}>Data final da garantia</Text><DatePicker
							style={{width: 200}}
							date={dtGarantia}
							mode="date"
							placeholder="Selecione a data da garantia"
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
							onDateChange={(date) => {setDtGarantia(date)}}
						/>
				</View>
		

			</View>
			
			<Button
				style={{ margin: 10, marginTop: -10,
					justifyContent: "end" }}
					status="success"
				text="Salvar"
				onPress={() => { 
					cadastrarItem();
				}}
				/>
		</Layout>
	);
}
