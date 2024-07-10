const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const majorIntervals = [0, 4, 7];
const minorIntervals = [0, 3, 7];
const major7Intervals = [0, 4, 7, 11];
const minor7Intervals = [0, 3, 7, 10];
const major9Intervals = [0, 4, 7, 11, 14];
const minor9Intervals = [0, 3, 7, 10, 14];

function getNoteWithOctave(noteIndex, baseOctave) {
  const note = notes[noteIndex % 12];
  const octave = baseOctave + Math.floor(noteIndex / 12);
  return note + octave;
}

function generateChord(rootNote, chordType, baseOctave = 3) {
  const rootIndex = notes.indexOf(rootNote);
  let intervals;
  
  switch (chordType) {
    case 'major':
      intervals = majorIntervals;
      break;
    case 'minor':
      intervals = minorIntervals;
      break;
    case 'major7':
      intervals = major7Intervals;
      break;
    case 'minor7':
      intervals = minor7Intervals;
      break;
    case 'major9':
      intervals = major9Intervals;
      break;
    case 'minor9':
      intervals = minor9Intervals;
      break;
    default:
      throw new Error('Invalid chord type');
  }
  
  const chord = intervals.map(interval => getNoteWithOctave(rootIndex + interval, baseOctave));

  const inversions = [
    chord,
    [...chord.slice(1), getNoteWithOctave(rootIndex + intervals[0] + 12, baseOctave)],
    [...chord.slice(2), getNoteWithOctave(rootIndex + intervals[0] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[1] + 12, baseOctave)],
    [...chord.slice(3), getNoteWithOctave(rootIndex + intervals[0] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[1] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[2] + 12, baseOctave)],
    ...(intervals.length > 4 ? [[...chord.slice(4), getNoteWithOctave(rootIndex + intervals[0] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[1] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[2] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[3] + 12, baseOctave), getNoteWithOctave(rootIndex + intervals[4] + 12, baseOctave)]] : [])
  ];

  return inversions;
}

const chordTypes = ['major', 'minor', 'major7', 'minor7', 'major9', 'minor9'];
const chords = {};

notes.forEach(note => {
  chords[note] = {};
  chordTypes.forEach(type => {
    chords[note][type] = generateChord(note, type);
  });
});

export { chords };
