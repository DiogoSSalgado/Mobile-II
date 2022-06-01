import React from "react";
import { View, Text, ImageBackground, Image, TextInput } from "react-native";
import CardSocial from "../../components/CardSocial";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";
import Button from "../../components/Button";

export default function Perfil() {
  return (
    <View>
      <Text style={styles.title}>Diogo Silva Salgado</Text>
      <CardSocial>
        <>
          <FontAwesome5 name="facebook" style={styles.icon} />
          <TextInput placeholder="https://facebook.com" style={styles.input} />
        </>
      </CardSocial>
      <CardSocial>
        <>
          <FontAwesome5 name="instagram" style={styles.icon} />
          <TextInput placeholder="https://instagram.com" style={styles.input} />
        </>
      </CardSocial>
      <CardSocial>
        <>
          <FontAwesome5 name="linkedin" style={styles.icon} />
          <TextInput placeholder="https://linkedin.com" style={styles.input} />
        </>
      </CardSocial>
      <Button
        title="Salvar"
        type="third"
        onPress={() => console.log("Salvar")}
      />
      <Button
        title="Alterar Senha"
        type="third"
        onPress={() => console.log("Alterar Senha")}
      />
      <Button title="Sair" type="third" onPress={() => console.log("Sair")} />
    </View>
  );
}