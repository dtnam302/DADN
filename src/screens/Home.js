import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

const Home = ({ navigation }) => {
  return (
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
          <View style={{ width: "50%", alignItems: "flex-end", marginTop: 40 }}>
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
                color: "#FFF", //F30 => off
              }}
            >
              Light: On
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
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail")}
          style={{
            height: 250,
            elevation: 2,
            backgroundColor: "#F30", //red => manual off
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 160,
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
                fontSize: 25,
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

        <View
          // onPress={()=>navigation.navigate("Detail")}
          style={{
            height: 250,
            elevation: 2,
            backgroundColor: "#228b22",
            marginLeft: 20,
            marginTop: 20,
            borderRadius: 15,
            marginBottom: 10,
            width: 160,
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
                fontSize: 25,
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
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center",
          marginBottom: 40,
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
            >
              Go to >>
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
            fontSize: 40,
            textAlign: "center",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          LUX: 720
        </Text>
      </View>
    </View>
  );
};
export default Home;
