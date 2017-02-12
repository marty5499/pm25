require('webduino-blockly');

module.exports = function (app) {
  var g3Model = app.models.g3; //取得操控的 Model
  var g3;
  boardReady({ board: 'Smart', device: '10XMWErw', transport: 'mqtt' },
    function (board) {
      board.systemReset();
      console.log("ready...");
      board.samplingInterval = 50;
      g3 = getG3(board, 2, 3);
      g3.read(function (evt) {
        console.log('pm25:', g3.pm25);
        g3Model.create({  //寫入資料庫
          'time': new Date(),
          'pm25': g3.pm25,
          'pm10': g3.pm10
        }, function (err, saveModel) {
          console.log("saveModel", saveModel);
        })
      }, 3000);
    });

}

