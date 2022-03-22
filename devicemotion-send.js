    //x,y,z,3軸格納
    var x, y, z;
    var array = [];
    var array1 = [];
    //x,y,z,3軸取得時間
    var nowtime;
    //データ取得し，変数へ代入
    var printdata = [];
    var n = 100; //setIntervalを100ミリ秒で実行
    var intervalId;

    function deviceMotionRequest() {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener("devicemotion", motion, true);
            }
          })
          .catch(console.error);
      }
    }

    function motion(event) {
      /*
      x = event.accelerationIncludingGravity.x;
      y = event.accelerationIncludingGravity.y;
      z = event.accelerationIncludingGravity.z;
      */
      x = event.alpha;
      y = event.beta;
      z = event.gamma;
      nowtime = Date.now();
      var result_acc = document.getElementById("result_acc"); //データを表示するdiv要素の取得
      result_acc.innerHTML = "加速度" + "<br>" +
        "x: " + x + "<br>" //x軸の値
        +
        "y: " + y + "<br>" //y軸の値
        +
        "z: " + z; //z軸の値
    }

    function display() {
      let today = Date(nowtime);
      array.push(nowtime + "/" + x + "/" + y + "/" + z);
      let ac = today + "/" + x + "/" + y + "/" + z;
      array1.push(ac);
      let txt = document.getElementById("table");
      txt.innerHTML = ac;
      var list = '';
      for (var i = 0; i < array1.length; i++) {
        list += '<li>' + array1[i] + '</li>';
      }
      document.getElementById("arraytable").innerHTML = list;
      console.log("display");
      console.log(array);
    }

    function start() {
      console.log("start");
      intervalId = setInterval(display, n);
    }

    function stop() {
      console.log("stop");
      clearInterval(intervalId);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'senddata.py');
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // JSONとしてヘッダーを指定
      xhr.send(JSON.stringify(array)); //通信
      xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200) {

          console.log(xhr.responseText);

        }
      }
    }

    function reset() {
      clearInterval(intervalId);
      location.reload(); //更新
      array.length = 0; //要素削除
      array1.length = 0; //要素削除
    }

    document.querySelector("#start").addEventListener("click", start);
    document.querySelector("#stop").addEventListener("click", stop);
    document.querySelector("#reset").addEventListener("click", reset);
    window.addEventListener("deviceorientation", motion, true);