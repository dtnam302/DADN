import React, { useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import { FlatGrid } from "react-native-super-grid";

export default function Detail() {
  const [items, setItems] = React.useState([
    { name: "DO AM", code: "#1abc9c" },
    { name: "NHIET DO", code: "#2ecc71" },
    { name: "SUC GIO", code: "#3498db" },
    { name: "NANG LUONG SU DUNG", code: "#9b59b6" },
    { name: "TEST", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
  ]);

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
            height: "80%",
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
                FARM INFORMATION
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
      </View>

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
            <Text>More infor</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
