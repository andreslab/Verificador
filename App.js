
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [state, setstate] = useState("")
  const [result, setResult] = useState("")

  return (
    <View style={styles.container}>
      < Text style={{
        margin: 10,
        textAlign: "left"
      }} > Verificador</Text >
      <TextInput
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: "#dd",
          textAlign: "left",
          height: 40
        }}
        placeholder='valor a examinar'
        autoCapitalize='none'
        value={state}
        onChangeText={(text) => setstate(text)} />
      <Button
        title='Examinar' style={{
          margin: 10
        }}
        onPress={(() => {
          setResult(examinate(state))
        })} />
      <Text>{result}</Text>
    </View>
  );
}

function examinate(value) {
  if (isBalanced(value)) {
    console.log("Balanceado");
    return "Balanceado";
  } else {
    console.log("No balanceado");
    return "No balanceado";
  }
}

function isBalanced(value) {

  var valueWithoutElement = value;
  var searching = [];

  if (!valueWithoutElement.includes("(") && !valueWithoutElement.includes(")")) {
    return true
  }

  //................................

  var isExisted = true;
  while (isExisted) {

    console.log("pre face wrap: " + valueWithoutElement);
    const exreDetectFaceWrap = /\([:][()]\)/g
    searching = exreDetectFaceWrap.exec(valueWithoutElement);
    //remover elementos encontrados
    if (searching != null) {
      if (searching.length > 0) {
        searching.forEach((element) => {
          valueWithoutElement = valueWithoutElement.replace(element, '');
        });
      }
    }

    //console.log(valueWithoutElement);
    console.log("pre group: " + valueWithoutElement);
    const exreDetectGroup = /\([^()]*?\)/g
    searching = exreDetectGroup.exec(valueWithoutElement);
    //detecta objetos que esten entre parentesis, que no sean parentesis
    if (searching != null) {
      if (searching.length > 0) {
        //remover elementos encontrados
        searching.forEach((element) => {
          valueWithoutElement = valueWithoutElement.replace(element, '');
        });
      }
      isExisted = true;
    } else {
      isExisted = false;
    }
  }



  //................................

  //todo valida si posee caritas
  console.log("pre face: " + valueWithoutElement);
  const exreDetectFace = /([:][()])/g
  searching = exreDetectFace.exec(valueWithoutElement);
  //remover elementos encontrados
  if (searching != null) {
    if (searching.length > 0) {
      //console.log(searching);
      searching.forEach((element) => {
        //console.log(element);
        valueWithoutElement = valueWithoutElement.replace(element, '');
        //console.log(valueWithoutElement);
      });
    }
  }


  //................................

  console.log(valueWithoutElement);

  //valida si sobran parentesis o no
  if (valueWithoutElement.includes("(") || valueWithoutElement.includes(")")) {
    return false
  } else {
    return true
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
