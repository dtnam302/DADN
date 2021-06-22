export const USER = {
  host: "io.adafruit.com",
  port: 80,
  userName: "dtnam302",
  password: "aio_anxg707nNwqoJSTPJoYzFb8MWoaA",
};
export const DefaultConnectOptions = {
  reconnect: false,
  cleanSession: true,
  mqttVersion: 3,
  keepAliveInterval: 60,
  timeout: 60,
};

export const ConnectSetting = {
  QOS: 0,
  RETAIN: true,
};

export const Topics = [
  {
    //johnwick123456
    name: `${USER.userName}/feeds/relay`,
    thing: "relay",
    jsonobj: (payload) => {
      return {
        id: "1",
        name: "RELAY",
        data: payload,
        unit: "",
      };
    },
    on: "1",
    off: "0",
  },

  {
    name: `${USER.userName}/feeds/lcd`,
    thing: "lcd",
    jsonobj: (payload) => {
      return {
        id: "5",
        name: "LCD",
        data: payload,
        unit: "",
      };
    },
    on: "System WARNING!",
    off: "System normal",
  },
];

export const Subscribe_Topics = [
  {
    //johnwick123456
    name: `${USER.userName}/feeds/relay`,
    thing: "relay",
  },
  {
    name: `${USER.userName}/feeds/lux`,
    thing: "lux",
  },
  {
    name: `${USER.userName}/feeds/lcd`,
    thing: "lcd",
  },
];
