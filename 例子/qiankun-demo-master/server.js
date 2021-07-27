/*
 * @Author: jing.chen
 * @Date: 2020-10-30 09:49:36
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-11-11 11:08:39
 * @Description: 
 */
const async = require('async');
const exec = require('child_process').exec;

function runServe (path, callback) {
  let dev = exec(
    `cd ${path} && ls && npm run serve`,
    {
      detached: true,
      maxBuffer:16*1024*1024
    },
    function (error, stdout, stderr) {
      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
  })
  dev.stdout.pipe(process.stdout)
  // dev.stderr.pipe(process.stderr)
}

async.series([
  cb => {
    async.parallel([
      callback => {
        console.log('now is run main-app')
        runServe('main-app/', callback)
      },
      callback => {
        console.log('now is run child01')
        runServe('child-app01/', callback)
      },
      callback => {
        console.log('now is run child02')
        runServe('child-app02/', callback)
      }
    ], cb)
  }
], (err, results) => {
  if (err) throw err;
  console.log(results)
})