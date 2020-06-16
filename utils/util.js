const myPromise = showlog => {
  // 返回一个Promise实例对象 
  return new Promise((resolve, reject) => {
    resolve("i am a promise resolve, " + showlog)
  })
}

module.exports = {
  myPromise: myPromise
}