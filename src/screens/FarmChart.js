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
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const FarmChart = () => {
  var [count, setCount] = useState(true);

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
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
              legend: ["Sunny Days"], // optional
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            //yAxisLabel="$"
            yAxisSuffix="lux"
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
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
              //legend: ["Rainy Days"], // optional
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            //yAxisLabel="W"
            yAxisSuffix="kWh"
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
