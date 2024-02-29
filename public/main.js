// grab all the buttons on the page that say 'go to this section'
// it's for attaching a listener to them later
let playerButtons = document.getElementsByClassName('play-video');
// the player-container child is the video player iframe element
let iframeElement = document.getElementById('player-container').children[0];

// first half of the url that gets fed to the iframe
const courseURLPrefix = 'https://www.youtube-nocookie.com/embed/';
// second half of the url that points to the specific yt video
const courseURLSuffix = {
  1: 'o3IIobN4xR0',
  2: 'eCRbEILXXmE',
  3: 'rdWM6kUImjE',
  4: 'Q1Obtn29twk',
  5: 'E6Z8cWU_fjI',
  6: 'L55ax0blZY0',
  7: 'k8r3B0JGMt4',
  8: 'PWVRSXQxsXc',
  9: 'OaglXfjsBaE',
  10: 'WftjV2L7oyk',
  11: 'qEj0pXGVwjY',
  12: '_A20kVsaqIk',
  13: 'pS6ykGL-fRE',
  14: 'cBWUvTZPeKw',
  15: '68Li7ukgDKg',
  16: 'av6iPI_zJTU',
  19: 'YUQUGtUbwMY',
  20: 'cL0qP6kM_1U',
  21: '75TQEQ6wxAE',
  22: 'LTda62-jyoM',
  23: 'qnmKELgyXc0',
  24: 'UpsonO_vBNk',
  25: 'ZlB4BockYNQ',
  26: 'WcSTeotmJtw',
  27: 'b5rjEW-_6po',
  28: 'G7XJRLaq2Cw',
  29: 'EOjUT746oLs',
  30: 'GihfY5OVDdk',
  31: 'PD-dx92RJtg',
  32: 'yEhs4XtuAgA',
  33: 'lIE1LFz4LJM',
  34: 'KM1RyffIKMg',
  35: 'IUCnAhr61pg',
  36: 'nv5SequVETI',
  37: '6rsA_RCe5YM',
  38: '000ai6I6Aow',
  39: 'zHq0v5RD_Zk',
  40: '3eafTTnEfMw',
  41: 'LHf_STV_rLE',
  44: 'jZ-kmmgi_d0',
  45: 'jZ-kmmgi_d0',
  46: 'SVX_HMum0n4',
  47: 'SVX_HMum0n4',
};

// for each button on the page that says 'go to this section', add an event listener
// and rig it to call the changePlayerUrl() function to update the url in the iFrame
for (let player = 0; player < playerButtons.length; player++) {
  playerButtons[player].addEventListener('click', changePlayerUrl);
}

// This function grabs the timestamp off the element itself (it's populated through ejs)
// which sits in the data-urlstring attr. Then give it to timeStampToMinutes() function
// to convert into minutes for the YT timestamp API by setting src= to the new URL
function changePlayerUrl(eventT) {
  eventT.preventDefault();
  let courseInfo = eventT.target.getAttribute('data-urlString').split('-');
  let courseNum = courseInfo[0];
  let courseTimeStamp = timeStampToMinutes(courseInfo[1]);
  iframeElement.src = `${courseURLPrefix}${courseURLSuffix[courseNum]}?start=${courseTimeStamp}&origin=https://leonstreamscripts.herokuapp.com`;
  return false;
}

// Timestamps come in the format `<course number>-<hours>:<minutes>:<seconds>`
// Needs converting to purely seconds in order for YT API to accept it.
function timeStampToMinutes(timeStamp) {
  if (timeStamp.includes(':')) {
    let separate = timeStamp.split(':');
    if (separate.length > 2) {
      let hours = Number(separate[0]);
      let minutes = Number(separate[1]);
      let seconds = Number(separate[2]);
      let total = seconds + minutes * 60 + hours * 60 * 60;
      return String(total);
    } else {
      let minutes = Number(separate[0]);
      let seconds = Number(separate[1]);
      return String(minutes * 60 + seconds);
    }
  } else {
    return timeStamp;
  }
}
