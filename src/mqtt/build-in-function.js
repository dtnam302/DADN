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
  warning: false, //trang thai thong bao
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
  console.log("Changing state of ", message.destinationName);
  console.log("see value:  ", JSON.parse(message.payloadString).data);
  let val = JSON.parse(message.payloadString).data;
  updateObjects(message.destinationName, val, state);
  //DevSettings.reload();
};
mqtt.connect(USER.host, USER.port, USER.userName, USER.password);
//getInitChartData();

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
const iokey = "aio_CraM232LDztkYUG2RxHySDg7ZUTr";
const user_name = "CSE_BBC";
const feed = "bk-iot-temp-humid";
const distance = 5;
const chart_col = 12;
const data_limit = distance * chart_col;
export function getInitChartData(state) {
  fetch(
    `https://io.adafruit.com/api/v2/${user_name}/feeds/${feed}/data?limit=${data_limit}`,
    {
      method: "GET",
      headers: {
        "X-AIO-Key": iokey,
      },
    }
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log("response:");
      console.log(response);

      //---------------------------
      var lb = [];
      var dt = [];

      var count = 0;

      response.forEach((elem) => {
        count += 1;
        if (count % distance == 1) {
          let d = new Date(elem["created_at"]);
          lb.push(d.toTimeString());
          dt.push(parseInt(JSON.parse(elem["value"])["data"]));
        }
      });

      console.log(lb);
      console.log(dt);

      state["data"]["labels"] = lb;
      state["data"]["datasets"][0]["data"] = dt;
    })
    .catch(function (err) {
      console.log("Error!");
      console.log(err);
    });
}

export function subscribeTopics() {
  console.log("Subscribing");
  Subscribe_Topics.forEach((sub_topic) => {
    mqtt.subscribeTopic(sub_topic.name);
  });
}

export function turnOnHandler() {
  Topics.forEach(({ name, jsonobj, on }) => {
    mqtt.send(name, JSON.stringify(jsonobj(on)));
  });
}

export function turnOffHandler() {
  Topics.forEach(({ name, jsonobj, off }) => {
    mqtt.send(name, JSON.stringify(jsonobj(off)));
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
