

fetch(`https://io.adafruit.com/api/v2/dtnam302/feeds/testchart`, {
  method: "GET",
  headers: {
    "X-AIO-Key": aio_YwqP4337uuNYM4xRhTFZH2SqZgwW,
  },
})
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
