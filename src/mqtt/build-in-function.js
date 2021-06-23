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
  luxEstimated: "110", //anh sang tot nhat
  timeEstimated: 10000, //thoi gian u sang
  luxavg: 0,
  solidavg: 0,
  humavg: 0,
  temavg: 0,
  elec: 0,
  data: {
    //data of chart
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  },
};
var mqtt = new MQTT();

mqtt.ConnectSuccessAction = () => {
  subscribeTopics();
};

mqtt.SetResponseFunction = (message) => {
  let val = JSON.parse(message.payloadString).data;
  updateObjects(message.destinationName, val, state);
};
mqtt.connect(USER.host, USER.port, USER.userName, USER.password);

// main object update
export function updateObjects(destinationName, data, state) {
  Subscribe_Topics.forEach(({ name, thing }) => {
    if (name == destinationName) {
      if (thing == "relay") {
        if (data == "1") {
          state["led"] = false;
        } else {
          state["led"] = true;
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
  fetch(
    `https://io.adafruit.com/api/v2/${USER.userName}/feeds/luxapi/data.json?X-AIO-Key=${USER.password}`
  )
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
      const items = lb.slice(0, 6);
      const items1 = dt.slice(0, 6);

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
    var lcd = "";
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
  fetch(
    `https://io.adafruit.com/api/v2/${USER.userName}/feeds/luxapi/data.json?X-AIO-Key=${USER.password}`
  )
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
  fetch(
    `https://io.adafruit.com/api/v2/${USER.userName}/feeds/soilapi/data.json?X-AIO-Key=${USER.password}`
  )
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
  fetch(
    `https://io.adafruit.com/api/v2/${USER.userName}/feeds/humidity-tempapi/data.json?X-AIO-Key=${USER.password}`
  )
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
