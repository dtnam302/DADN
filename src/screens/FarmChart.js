import React, { useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import {
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements/dist/buttons/Button";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  state,
  updateObjects,
  turnOffHandler,
  turnOnHandler,
  getInitChartData,
  subscribeTopics,
  sendLCD,
} from "./../mqtt/build-in-function";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

getInitChartData(state);
const FarmChart = () => {
  var lb = state["data"]["labels"];
  var dt = state["data"]["datasets"][0]["data"];
  var elec = [];
  var wattinsecond = 9;
  var count = 1;
  const sum = dt.reduce((a, b) => a + b, 0);
  const avg = sum / dt.length || 0;

  dt.forEach((elem) => {
    if (elem > 100) {
      elec.push(0);
    } else {
      elec.push(count * wattinsecond);
      count += 1;
    }
  });
  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#FFF",
          flex: 1,
          paddingBottom: 50,
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
                FARM CHART
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
            marginTop: -25,
          }}
        ></LinearGradient>
        {/* Chart 1 start here *******************************/}

        <View
          style={{
            marginBottom: 35,
          }}
        >
          <Text>ANH SANG TRUNG BINH</Text>
          <LineChart
            data={{
              labels: lb,
              datasets: [
                {
                  data: dt,
                },
              ],
              legend: avg > 100 ? ["Sunny Day"] : ["Rainy Day"], // optional
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            //yAxisLabel="$"
            yAxisSuffix=" L"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#3cb371",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Chart 2 start here *******************************/}

        <View>
          <Text>DIEN NANG TIEU THU</Text>
          <LineChart
            data={{
              labels: lb,
              datasets: [
                {
                  data: elec,
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            //yAxisLabel="W"
            yAxisSuffix="W"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#0000cd",
              backgroundGradientTo: "#0000cd",
              backgroundGradientFrom: "#0000cd",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default FarmChart;
