//----專門給commonQuestion2的通用設定產生器
export function generateSettings(shortenObj){
  let rtnObj = {}
  //先把固定的東西丟進去
  rtnObj.subtitles = shortenObj.subtitles
  rtnObj.textareas = shortenObj.textareas
  //再來處理後面的產生器
  rtnObj.questions = generatePanel(shortenObj.questions)
  return rtnObj
}

export function generatePanel(shortenObj) {
  let rtnArr = []
  let toObj = {}
  let tempArr = []
  for(let panelCount = 0 ; panelCount < shortenObj.panelQuestion.length ; panelCount++) {
    toObj.questionLabels = shortenObj.questionLabels
    toObj.generate = shortenObj.panelAnswer
    let thisQuestion = shortenObj.panelQuestion[panelCount]
    toObj.panelLabel = thisQuestion.panelLabel
    toObj.notGenerate = thisQuestion.questions
    if(panelCount==0){
      toObj.answerStart = 1
    }else{
      toObj.answerStart = tempArr[panelCount-1].answerStart + tempArr[panelCount-1].notGenerate.length
    }
    tempArr.push(toObj)
    toObj = {}
  }
  rtnArr = tempArr.map(element=>generateQuestion(element))
  return rtnArr
}

export function generateQuestion(shortenObj) {    //小題產生器
  let rtnObj = {}
  //固定值先塞
  rtnObj.panelLabel = shortenObj.panelLabel
  rtnObj.answerStart = shortenObj.answerStart
  //再來處理動態的部分
  let dynamicCount = 0  //用來計算動態(題目)的位置
  let staticCount = 0   //用來計算靜態(輸入)的位置
  rtnObj.questionLabels = shortenObj.questionLabels.map(element=>{
    return {
      width: element.width,
      text: element.text,
    }
  })
  const answerLength = shortenObj.questionLabels.length     //一題的長度
  const questionLength = shortenObj.notGenerate.length       //題數
  let nowNoGen = []
  let thisQuestion = []
  for(let toEveryQuestion = 0 ; toEveryQuestion < questionLength ; toEveryQuestion++) {
    nowNoGen = shortenObj.notGenerate[toEveryQuestion]   //把該題的文字敘述拿出來
    dynamicCount = 0
    staticCount = 0
    let thisAnswer = []
    for(let toEveryAnswer = 0 ; toEveryAnswer < answerLength ; toEveryAnswer++) {
      if(shortenObj.questionLabels[toEveryAnswer].generate){
        //要自動產生的 => 使用者輸入欄位
        const thisObject = shortenObj.generate[staticCount]
        const toObject = { 
          label: shortenObj.questionLabels[toEveryAnswer].text + ':',
          ...thisObject,
        }
        staticCount++
        thisAnswer.push(toObject)
      }else{
        //不自動產生的 => 文字欄位
        thisAnswer.push({
          label: nowNoGen[dynamicCount],
          type: 'label',
        })
        dynamicCount++
      }
    }
    thisQuestion.push(thisAnswer)
  }
  rtnObj.questionAnswers = thisQuestion
  return rtnObj
}