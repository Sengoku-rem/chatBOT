const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

module.exports = (robot) => {
  robot.respond(/join (.*)/i, (res) => {
    const notes = res.match[1].trim().toLowerCase().split(' ');

    // 音階に対応するファイルパスのマップ
    const noteFilePaths = {
      'c': '/path/to/c.mp3',
      'd': '/path/to/d.mp3',
      'e': '/path/to/e.mp3',
      // 他の音階に対応するファイルパスを追加
    };

    // ファイルパスの配列
    const filePaths = notes.map((note) => noteFilePaths[note]).filter(Boolean);

    // ファイルの結合
    const joinedFilePath = path.join(__dirname, '../../Muu/joined.mp3');
    const ffmpegPath = '/usr/bin/ffmpeg'; // FFmpegのパスを指定

    const command = `${ffmpegPath} -i "concat:${filePaths.join('|')}" -c copy ${joinedFilePath}`;

    exec(command, (error) => {
      if (error) {
        console.error('音声データの結合中にエラーが発生しました:', error);
        res.send('音声データの結合中にエラーが発生しました');
      } else {
        res.send(`MP3データの結合と保存が完了しました: ${joinedFilePath}`);
      }
    });
  });

  // 以下、既存のコマンドの定義
  robot.respond(/PING$/i, (res) => {
    res.send('PONG');
  });

  robot.respond(/ADAPTER$/i, (res) => {
    res.send(robot.adapterName);
  });

  robot.respond(/ECHO (.*)$/i, (res) => {
    res.send(res.match[1]);
  });

  robot.respond(/TIME$/i, (res) => {
    res.send(`Server time is: ${new Date()}`);
  });
};