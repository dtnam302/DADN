import React, { useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

//mqtt part
import {
  USER,
  DefaultConnectOptions,
  ConnectSetting,
  Topics,
  Subscribe_Topics,
} from "../global/user";
import MQTT from "../mqtt/mqtt-object";

import {
  state,
  updateObjects,
  turnOffHandler,
  turnOnHandler,
  getInitChartData,
  subscribeTopics,
  sendLCD,
} from "./../mqtt/build-in-function";

//defaut value

const Home = ({ navigation }) => {
  var [auto, setAuto] = useState(false);
  var [isOn, setIson] = useState(state["led"]);
  var [lux, setLux] = useState(state["lux"]);
  var [warning, setWarning] = useState(false);

  var luxEstimated = "750";
  var timeEstimated = 5000; //20s

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#FFF",
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#00a46c",
            height: "28%",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Image
                source={require("../images/1.png")}
                style={{
                  height: 60,
                  width: 60,
                  marginTop: 50,
                }}
              />
            </View>
            <View
              style={{ width: "50%", alignItems: "flex-end", marginTop: 40 }}
            >
              <Image
                source={require("../images/g.png")}
                //style={{height:80,width:150}}
                style={{
                  width: 150,
                  height: 75,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: 25,
                  color: "#FFF",
                  fontWeight: "bold",
                }}
              >
                Welcome Nam
              </Text>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={["rgba(0,164,109,0.4)", "transparent"]}
          style={{
            left: 0,
            right: 0,
            height: 90,
            marginTop: -10,
          }}
        ></LinearGradient>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
              }}
            >
              Action
            </Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: isOn ? "#00a46c" : "#000",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: isOn ? "#FFF" : "#F30", //F30 => off
                }}
                onPress={() => {
                  if (!auto) {
                    if (isOn) {
                      console.log("Turn off");
                      turnOffHandler();
                    } else {
                      turnOnHandler();
                    }
                    setIson((isOn = !isOn));
                    state["led"] = !state["led"];
                  }
                  //update by light status
                  // turn on and off sent
                }}
              >
                Light: {isOn ? "On" : "OFF"}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 400 }}
        >
          <LinearGradient
            colors={["rgba(0,164,109,0.09)", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 100,
              marginTop: 220,
              top: 0,
            }}
          />
          <TouchableOpacity //manual button
            onPress={() => {
              setAuto((auto = !auto));
            }}
            style={{
              height: 200,
              elevation: 2,
              backgroundColor: auto ? "#F30" : "#228b22", //red => auto off
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 15,
              marginBottom: 10,
              width: 160,
              // height: '100%',
            }}
          >
            <Image
              source={require("../images/4.png")}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
            />

            <View
              style={{
                flexDirection: "row",
                //paddingTop: 20,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                MANUAL
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity //auto button
            onPress={() => {
              setAuto((auto = !auto));
              //auto mode
              var e = parseInt(luxEstimated);
              var c = parseInt(lux);
              console.log(isOn);
              if (c < e) {
                if (!isOn) {
                  setIson((isOn = !isOn));
                  state["led"] = !state["led"];
                  turnOnHandler();

                  setTimeout(function () {
                    setIson((isOn = !isOn));
                    state["led"] = !state["led"];
                    turnOffHandler();
                    console.log("auto mode ~~~~~~~");
                  }, timeEstimated);
                }
              } else {
                if (isOn) {
                  setIson((isOn = !isOn));
                  state["led"] = !state["led"];
                  turnOffHandler();

                  setTimeout(function () {
                    setIson((isOn = !isOn));
                    state["led"] = !state["led"];
                    turnOnHandler();
                    console.log("auto mode ~~~~~~~");
                  }, timeEstimated);
                }
              }
            }}
            style={{
              height: 200,
              elevation: 2,
              backgroundColor: !auto ? "#F30" : "#228b22", //red => auto off
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 15,
              marginBottom: 10,
              width: 160,
              // height: '100%',
            }}
          >
            <Image
              source={require("../images/5.png")}
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: "contain",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                //paddingTop: 20,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                AUTO
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
              }}
            >
              Farm Information
            </Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
                onPress={() => {
                  navigation.navigate("Detail");
                }}
              >
                Go to >>
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            width: "100%",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
              }}
            >
              Send data to LCD LED
            </Text>
          </View>
          <View style={{ width: "50%", alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
                onPress={() => {
                  let timesend = setInterval(sendLCD(state), 5000);
                  clearInterval(timesend);
                }}
              >
                Send >>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            //paddingTop: 20,
            paddingHorizontal: 10,
            paddingBottom: 25,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              textAlign: "center",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: state["lux"] > 100 ? "#228b22" : "#F30",
            }}
          >
            LUX: {state["lux"]}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
//test git
//test git 2
