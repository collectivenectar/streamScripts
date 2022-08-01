let playerButtons = document.getElementsByClassName('play-video')
let iframeElement = document.getElementById('player-container').children[0]

const courseURLPrefix = "https://www.youtube-nocookie.com/embed/"
// yt urls
const courseURLSuffix = {
  1: "o3IIobN4xR0",
  2: "eCRbEILXXmE",
  3: "rdWM6kUImjE",
  4: "Q1Obtn29twk",
  5: "E6Z8cWU_fjI",
  6: "L55ax0blZY0",
  7: "k8r3B0JGMt4",
  8: "PWVRSXQxsXc",
  9: "OaglXfjsBaE",
  10: "WftjV2L7oyk",
  11: "qEj0pXGVwjY",
  12: "_A20kVsaqIk",
  13: "pS6ykGL-fRE",
  14: "cBWUvTZPeKw",
  15: "68Li7ukgDKg",
  16: "av6iPI_zJTU",
  19: "YUQUGtUbwMY",
  20: "cL0qP6kM_1U",
  21: "75TQEQ6wxAE",
  22: "LTda62-jyoM",
  23: "qnmKELgyXc0",
  24: "UpsonO_vBNk",
  25: "ZlB4BockYNQ",
  26: "WcSTeotmJtw",
  27: "b5rjEW-_6po",
  28: "G7XJRLaq2Cw",
  29: "EOjUT746oLs",
  30: "GihfY5OVDdk",
  31: "PD-dx92RJtg",
  32: "yEhs4XtuAgA",
  33: "lIE1LFz4LJM",
  34: "KM1RyffIKMg",
  35: "IUCnAhr61pg",
  36: "nv5SequVETI",
  37: "6rsA_RCe5YM",
  38: "000ai6I6Aow",
  39: "zHq0v5RD_Zk",
  40: "3eafTTnEfMw",
  41: "LHf_STV_rLE"
}

for(let player = 0; player < playerButtons.length; player++){
  playerButtons[player].addEventListener('click', changePlayerUrl)
}

function changePlayerUrl(eventT){
  eventT.preventDefault()
  let courseInfo = eventT.target.getAttribute('data-urlString').split("-")
  let courseNum = courseInfo[0]
  let courseTimeStamp = timeStampToMinutes(courseInfo[1])
  console.log("test")
  iframeElement.src = `${courseURLPrefix}${courseURLSuffix[courseNum]}?start=${courseTimeStamp}&origin=https://leonstreamscripts.herokuapp.com`
  return false
}

function timeStampToMinutes(timeStamp){
  if(timeStamp.includes(":")){
    let separate = timeStamp.split(":")
    if(separate.length > 2){
      let hours = Number(separate[0])
      let minutes = Number(separate[1])
      let seconds = Number(separate[2])
      let total = seconds + (minutes * 60) + (hours * 60 * 60)
      return String(total)
    }else{
      let minutes = Number(separate[0])
      let seconds = Number(separate[1])
      return String((minutes * 60) + seconds)
    }
  }
  else{
    return timeStamp
  }
}
