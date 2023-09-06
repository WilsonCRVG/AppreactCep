import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Api from './src/services/api';

export default function App() {

  const [cep , setCep] = useState('')
  const [logradouro , setLogradouro] = useState('')
  const [bairro , setBairro] = useState('')
  const [cidade , setCidade] = useState('')
  const [uf , setEstado]= useState('')

  
  
  const buscarCep= async ()=>{
    //verificar Erros
    if(cep==""){
      Alert.alert("❌","Cep Inválido")
    }

    try {
      const respose = await Api.get(`/${cep}/json`)
      setLogradouro(respose.data.logradouro)
      setBairro(respose.data.bairro)
      setCidade(respose.data.localidade)
      setEstado(respose.data.uf)


    } catch (error) {
        console.log(`ERROR : ${error}`)
    }
  }



  return (
    <View style={estilos.container}>

        <Text style={{fontWeight:'bold'}}>Buscador de CEP</Text>
        
        <TextInput style={estilos.inputs} placeholder='CEP'
        onChangeText={(texto)=>setCep(texto)}
        value={cep}
        />

        <TextInput style={estilos.inputs} placeholder='Logradouro'
        onChangeText={(logradouro)=>setLogradouro(logradouro)}
        value={logradouro}
        />

        <TextInput style={estilos.inputs} placeholder='Numero | Complemento'
        
        />

        <TextInput style={estilos.inputs} placeholder='Bairro'
        onChangeText={(bairro)=>setBairro(bairro)}
        value={bairro}
        />

        <TextInput style={estilos.inputs} placeholder='Cidade'
        onChangeText={(cidade)=>setCidade(cidade)}
        value={cidade}
        />


        <View style={estilos.containerView}> 
            <TextInput style={estilos.tamanhosinputsEstado} placeholder='Estado'
            onChangeText={(estado)=>setEstado(estado)}
            value={uf}
            />
        
            <TouchableOpacity style={estilos.botaoBuscar} onPress={buscarCep}>
              <Text>Buscar</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
}

const estilos = StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"#FFFF",
    padding:20,
    backgroundColor:'#00ffee'
  },

  inputs:{
    width:'75%',
    padding:5,
    borderRadius:10,
    borderWidth:2,
    marginTop:5,
    fontWeight:'bold',
  },


  containerView:{
    width:"75%",
    flexDirection:"row",
    marginTop:5,
  },
  tamanhosinputsEstado:{
    flex:1,
    padding:5,
    marginRight:5,
    borderRadius:10,
    borderWidth:2,
    fontWeight:'bold'
  },
  botaoBuscar:{
    flex:2,
    alignItems:"center",
    justifyContent:"center",
    padding:5,
    borderWidth:2,
    borderRadius:10,
  },

})