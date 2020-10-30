const fs = require('fs')
const path = require('path')

const controller = {

  getResult ( ctx, next ) {
    // 判断手机号是否传递，不传会报错
    const requestBody = { ...ctx.request.phone }
    if (!requestBody.phone) {
      ctx.body = {
        code: 200,
        success: false,
        message: '请先去面试'
      };
      
      next();

      return null
    }

    let fileStr = null
    let resut = null
    
    try {
      // 读取结果数据
      fileStr = fs.readFileSync(path.resolve(__dirname, '../dataBase/resultData/result.json'))

      // 重列表中找到对应的一个数据
      const resultArr = JSON.parse(fileStr)
      resultArr.forEach((item) => {
        if (item.phone === requestBody.phone) {
          resut = item
        }
      })

    } catch(error) {
      console.log(error)
    }

    ctx.body = {
      code: 200,
      success: !!resut,
      data: resut ? resut : null
    };

    next()
  },

  saveMessage(ctx, next) {
    const resultStr = fs.readFileSync(path.resolve(__dirname, '../dataBase/resultData/result.json'))
    const resultList = JSON.parse(resultStr)
    const requestBody = { ...ctx.request.body }
    let total = 0
    let evel = 20

    let result = {}

    if (requestBody.uaerId % 2 === 0) {
      evel = 50
    }

    const mark = []
    for (let i = 0; i ++; i < 6) {
      console.log(mark)
      mark[i] = Number((Math.random() * 50 + evel).toFixed(0));
      total += mark[i]
    }

    result = {
      "mark": mark,
      "average": (total / 6).toFixed(0),
      ...requestBody
    }
    resultList.push(result)

    fs.writeFileSync(path.resolve(__dirname, '../dataBase/resultData/result.json'), JSON.stringify(resultList))

    ctx.body = {
      code: 200,
      success: true
    };

    next();
  },

  submitMessage( ctx, next ) {
    const requestBody = { ...ctx.request.body }
    if (!requestBody.phone) {
      ctx.body = {
        code: 200,
        success: false,
        message: 'phone cannot be empty.'
      };
      
      next();

      return null
    }

    let fileStr = null
    let userData = null
    
    let isFinished = false

    if (requestBody.finished === 1) {
      isFinished = true
      delete requestBody.finished
    }

    try {
      // 读取对应的用户信息文件
      fileStr = fs.readFileSync(path.resolve(__dirname, `../dataBase/submitData/${requestBody.phone}.json`))
    
      if (fileStr) {
        ctx.body = {
          code: 200,
          success: false,
          msg: '请勿重复提交'
        };
        return null
      }
    } catch(error) {
      console.log('file is empty', error)

      userData = requestBody
    }

    const mark = []
    let total = 0
    let resultList = null
    let evel = 20

    if (requestBody.phone % 2 === 0) {
      evel = 50
    }
    
    for (let i = 0; i < 6; i ++) {
      mark.push(Number((Math.random() * 50 + evel).toFixed(0)));
      total += mark[i]
    }

    const currentUser = {
      ...userData,
      mark: mark,
      average: Number((total / 6).toFixed(0)),
      createTime: new Date().getTime()
    }

    const resultFileStr = fs.readFileSync(path.resolve(__dirname, '../dataBase/resultData/result.json'))
    resultList = JSON.parse(resultFileStr)
    resultList.push(currentUser)

    fs.writeFileSync(path.resolve(__dirname, '../dataBase/resultData/result.json'), JSON.stringify(resultList))

    fs.writeFileSync(path.resolve(__dirname, `../dataBase/submitData/${requestBody.phone}.json`), JSON.stringify(userData))

    ctx.body = {
      code: 200,
      success: true
    };

    next();
  },

  createResult() {
    resultData
  }
};

module.exports = controller;