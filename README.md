# streamScripts
A fullstack app for searching 100Devs Leon stream transcripts

This app is designed to provide a faster way to search through course topics from
Leons 100Devs 2022 livestreams.

The transcripts themselves were directly copied from Youtube, just copied and
pasted into txt files, and then brought
one at a time into a JSON, then converted to a comma separated values file. The
database was then imported from the
.csv file using two data fields -- transcript timestamp and transcript string --
into a mongoDB collection.

This app was built using mongoDB, node.js, express.js, and EJS.

Here is a screenshot of what's at => leonstreamscripts.herokuapp.com

<img src="https://github.com/collectivenectar/streamScripts/blob/73c83ccfafc1692ec41723f264a1805ff9d5400c/leonstreamscripts.png" width="1000" height="560">

How does it work?

There are currently 3 different ways to request from the captions database:

2 options using Search:

by exact phrase - it searches for EXACTLY what you type, no exceptions, including
spaces between words

EXAMPLE: "software developer" will search for both words, 'software' AND 'developer',
in that order.

appearing together in the same entry - It searches for captions that contain ALL
of the words, but without caring about the order, or if they're spread out
throughout the entry.

EXAMPLE: "software developer" will search first for 'software', and then, IF the
word 'developer' is ALSO in that entry, then it will return that entry. It doesn't
matter if one word is at the beginning of a sentence, and the other is at the end.

and 1 option to browse:

by course number - Will return the entire course transcript, sorted, starting from
0:00, and goes to the last minute.

Just select the course, and hit 'browse' to look through.

Search tips:

The only restrictions I've placed on what you type is that it is alphanumerical characters
ONLY - Most of the captions don't have any punctuation anyways, except for the occasional
contraction, for example : can't, isn't, they're, he's, etc so if you have trouble finding
something, remove the apostrophe and whatever comes after it to get more results.

If you are digging for a mention of a concept or a certain topic, I recommend
using search words appearing together in the same entry, until you are familiar with
how it's phrased.

If the results you get shows that you searched for '---' or all underscores, you've
searched for either something that just doesn't exist, or you're using special
characters.

Stretch Goals:

Some things I'd like to add if I had the time:

Search filters - Adding say a specific course number to filter, or to filter out
results containing other specific words

Browsing By topics - Browse through the entire collection of videos
(or through specific videos) by topics, like 'HTML', 'CSS', 'cors', etc

Submit caption corrections - Would require user auth, but could add the ability
to submit suggested corrections to the db entry for that caption. Would require
approval to prevent abuse, but could still help increase accuracy of the search,
so it might be worth it.

Integrated course material links - Adding links to the repo/course materials for
each video so it's all in one place.

User generated content - Allow users to add information to timestamps, like
when the instructor begins a topic and ends a topic, to add a tag to indicate the
topic itself as 'OOP' or 'closures' etc. Comments don't seem worthwhile as this is
already on the youtube videos that are in the embedded player.

NOTE:

All transcripts are taken from the courses uploaded to Leons Youtube channel, so
be warned! The automatic captioning software Youtube uses to caption these videos
can make serious errors in the interpretation of what Leon says, so you may find
that certain uncommon nouns and names are usually mispelled or completely wrong,
depending on the situation.

I should also point out that the automatic captioning software does not always
register natural pauses in the dialogue, and does not add periods or punctuation.
Each string item in the transcripts may begin or end abruptly, and make it
difficult to search for specific phrases, especially if the phrase you're looking
for has been split between two transcripts. There is a possibility that I can
implement a fix to this issue, but it's a stretch goal at this point.
