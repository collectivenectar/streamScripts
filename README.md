# streamScripts
A fullstack app for searching 100Devs Leon stream transcripts

This app is designed to provide a faster way to search through course topics from Leons 100Devs 2022 livestreams.

All transcripts are taken from the courses uploaded to Leons Youtube channel, so be warned! The automatic captioning 
software Youtube uses to caption these videos can make serious errors in the interpretation of what Leon says, so
you may find that certain uncommon nouns and names are usually mispelled or completely wrong, depending on the situation.

I should also point out that the automatic captioning software does not always register natural pauses in the dialogue,
and does not add periods or punctuation. Each string item in the transcripts may begin or end abruptly, and make it 
difficult to search for specific phrases, especially if the phrase you're looking for has been split between two 
transcripts. There is a possibility that I can implement a fix to this issue, but it's a stretch goal at this point.

The transcripts themselves were directly copied from Youtube, just copied and pasted into txt files, and then brought
one at a time into a JSON, then converted to a comma separated values file. The database was then imported from the 
.csv file using two data fields -- transcript timestamp and transcript string -- into a mongoDB collection.

This app was built using mongoDB, node.js, express.js, and EJS.

Here are some mockups:

<img src="https://github.com/collectivenectar/streamScripts/blob/ccf6e328aa6f1bb51474dc468dd78b9380ab8f18/streamScriptsBrowse.png?raw=true" width="683" height="384">

<img src="https://github.com/collectivenectar/streamScripts/blob/ccf6e328aa6f1bb51474dc468dd78b9380ab8f18/streamScriptsLookup.png?raw=true" width="683" height="384">
