import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";

import socketio from "socket.io-client";

import SpotList from "../components/SpotList";

import logo from "../assets/logo.png";

const List = ({ navigation }) => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://0.0.0.0:3030", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? "APROVADA" : "REJEITADA"
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("techs").then(techs => {
      const techsArray = techs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  function handleLoggout() {
    AsyncStorage.removeItem("user");

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>

      <TouchableOpacity onPress={handleLoggout} style={styles.button}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  },
  button: {
    height: 42,
    backgroundColor: "#f05b3b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 30
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default List;
