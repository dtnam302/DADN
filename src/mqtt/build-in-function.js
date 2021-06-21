import {
  USER,
  DefaultConnectOptions,
  ConnectSetting,
  Topics,
  Subscribe_Topics,
} from "../global/user";
import MQTT from "../mqtt/mqtt-object";
import HomeStackNavigator from "../navigations/Navigator";
//init state
export var state = {
  led: false, //trang thai den
  lux: "0", //so lieu den
  auto: false, //trang thai thong bao
  luxEstimated: "110",
  timeEstimated: 10000,
  luxavg: 0,
  solidavg: 0,
  humavg: 0,
  temavg: 0,
  elec: 0,
  data: {
    //data of chart
    labels: [
      "1:00",
      "4:00",
      "7:00",
      "10:00",
      "13:00",
      "16:00",
      "19:00",
      "22:00",
    ],
    datasets: [
      {
        data: [29.0, 24.3, 26.0, 28.1, 32.0, 33.4, 35.0, 10],
      },
    ],
  },
};
var mqtt = new MQTT();

mqtt.ConnectSuccessAction = () => {
  subscribeTopics();
};

mqtt.SetResponseFunction = (message) => {
  //console.log("Changing state of ", message.destinationName);
  //console.log("see value:  ", JSON.parse(message.payloadString).data);
  let val = JSON.parse(message.payloadString).data;
  updateObjects(message.destinationName, val, state);
  //DevSettings.reload();
};
mqtt.connect(USER.host, USER.port, USER.userName, USER.password);

// main object update
export function updateObjects(destinationName, data, state) {
  Subscribe_Topics.forEach(({ name, thing }) => {
    if (name == destinationName) {
      if (thing == "relay") {
        if (data == "1") {
          //this.setState({valve: 'ON', fan: 'ON', pump: 'ON', warning: true});
          state["led"] = false;
          state["warning"] = true;
        } else {
          //this.setState({valve: 'OFF', fan: 'OFF', pump: 'OFF', warning: false});
          state["led"] = true;
          state["warning"] = false;
        }
      }
      if (thing == "lux") {
        let t = data.split("-")[0];
        state["lux"] = t;
      }
    }
  });
}

//data for fetch api from server
const iokey = "aio_YwqP4337uuNYM4xRhTFZH2SqZgwW";
const user_name = "dtnam302";
const feed = "testchart";
const distance = 5;
const chart_col = 12;
const data_limit = distance * chart_col;
// export function getInitChartData(state) {
//   fetch("../global/test.json")
//     .then((response) => response.json())
//     .then(function (response) {
//       console.log("response:");
//       console.log(typeof response);

//       //---------------------------
//       var lb = [];
//       var dt = [];

//       var count = 0;

//       response.forEach((elem) => {
//         console.log("Here");
//         count += 1;
//         if (count % distance == 1) {
//           let d = new Date(elem["created_at"]);
//           lb.push(d.toTimeString());
//           dt.push(parseInt(JSON.parse(elem["value"])["data"]));
//         }
//       });

//       console.log(lb);
//       console.log(dt);

//       state["data"]["labels"] = lb;
//       state["data"]["datasets"][0]["data"] = dt;
//     })
//     .catch(function (err) {
//       console.log("Error!");
//       console.log(err);
//     });
// }

export function getInitChartData(state) {
  //var response = require("../global/test.json");
  fetch(`https://dadnhk212.herokuapp.com/get/lux`)
    .then((response) => response.json())
    .then(function (response) {
      //---------------------------
      var lb = [];
      var dt = [];

      var count = 0;

      response.forEach((elem) => {
        let d = new Date(elem["created_at"]);
        lb.push(d.toTimeString().slice(0, 8));
        dt.push(parseInt(JSON.parse(elem["value"])["data"]));
      });
      const items = lb.slice(-5);
      const items1 = dt.slice(-5);

      state["data"]["labels"] = items;
      state["data"]["datasets"][0]["data"] = items1;
    });
}

export function subscribeTopics() {
  console.log("Subscribing");
  Subscribe_Topics.forEach((sub_topic) => {
    mqtt.subscribeTopic(sub_topic.name);
  });
}

export function turnOnHandler() {
  Topics.forEach(({ name, jsonobj, on, thing }) => {
    if (thing != "lcd") mqtt.send(name, JSON.stringify(jsonobj(on)));
  });
}

export function turnOffHandler() {
  Topics.forEach(({ name, jsonobj, off, thing }) => {
    if (thing != "lcd") mqtt.send(name, JSON.stringify(jsonobj(off)));
  });
}

export function sendLCD(state) {
  Topics.forEach(({ name, thing, jsonobj }) => {
    if (parseInt(state["lux"]) < 100) {
      lcd = `LOW LUX: ${state["lux"]}`;
    } else {
      lcd = `HIGH LUX: ${state["lux"]}`;
    }
    if (thing == "lcd") {
      mqtt.send(name, JSON.stringify(jsonobj(lcd)));
    }
  });
}

export function getAVGluxData(state) {
  //var response = require("../global/test.json");
  fetch("https://dadnhk212.herokuapp.com/get/lux")
    .then((response) => response.json())
    .then(function (response) {
      //---------------------------

      var count = 0;
      var len = response.length;
      var avgelec = 0;
      response.forEach((elem) => {
        count += parseInt(JSON.parse(elem["value"])["data"]);
        if (parseInt(JSON.parse(elem["value"])["data"]) > 100) {
          avgelec += 9 * (parseFloat(JSON.parse(elem["value"])["data"]) - 100);
        }
      });
      state["luxavg"] = count / len;
      state["elec"] = avgelec;
    });
}
export function getAVGsolidData(state) {
  //var response = require("../global/test.json");
  fetch("https://dadnhk212.herokuapp.com/get/soil")
    .then((response) => response.json())
    .then(function (response) {
      //---------------------------

      var count = 0;
      var len = response.length;
      response.forEach((elem) => {
        count += parseInt(JSON.parse(elem["value"])["data"]);
      });
      state["solidavg"] = count / len;
    });
}
export function getAVGhumtemData(state) {
  //var response = require("../global/test.json");
  fetch("https://dadnhk212.herokuapp.com/get/humidity")
    .then((response) => response.json())
    .then(function (response) {
      //---------------------------

      var tem = 0;
      var hum = 0;
      var len = response.length;
      response.forEach((elem) => {
        var string = JSON.parse(elem["value"])["data"];
        tem += parseInt(string.split("-")[0]);
        hum += parseInt(string.split("-")[1]);
      });
      state["humavg"] = hum / len;
      state["temavg"] = tem / len;
    });
}
