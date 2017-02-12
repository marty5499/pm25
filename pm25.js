require('webduino-blockly');

var g3;

boardReady({ board: 'Smart', device: '10XMWErw', transport: 'mqtt' },
  function (board) {
    board.systemReset();
    console.log("ready...");
    board.samplingInterval = 50;
    g3 = getG3(board, 2, 3);
    g3.read(function (evt) {
      console.log('pm25:', g3.pm25);
    }, 1000);
  });