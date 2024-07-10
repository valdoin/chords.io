<template>
  <div class="chord">
    <h2>{{ rootNote }} Chord</h2>

    <label for="chordType">Chord Type:</label>
    <select v-model="localChordType" id="chordType" @change="updateChordNotes" class="dropdown">
      <option value="major">Major</option>
      <option value="minor">Minor</option>
      <option value="major7">Major 7</option>
      <option value="minor7">Minor 7</option>
      <option value="major9">Major 9</option>
      <option value="minor9">Minor 9</option>
    </select>

    <label for="inversion">Inversion:</label>
    <select v-model="inversion" id="inversion" class="dropdown">
      <option v-for="(inv, index) in chordNotes" :value="index" :key="index">
        {{ index === 0 ? 'Root Position' : `${index}th Inversion` }}
      </option>
    </select>

    <button @click="playChord" class="play-button">Play Chord</button>
  </div>
</template>

<script>
import * as Tone from 'tone';

export default {
  name: 'ChordComponent',
  props: {
    rootNote: {
      type: String,
      required: true
    },
    chordData: {
      type: Object,
      required: true
    },
    chordType: {
      type: String,
      default: 'major'
    }
  },
  data() {
    return {
      localChordType: this.chordType,
      inversion: '0'
    };
  },
  computed: {
    chordNotes() {
      return this.chordData[this.rootNote][this.localChordType];
    },
    notes() {
      return this.chordNotes ? this.chordNotes[this.inversion] : [];
    }
  },
  methods: {
    async playChord() {
      const notes = this.notes;
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();

      await Tone.start();
      const noteDuration = Tone.Time('2n').toSeconds();
      const now = Tone.now();

      synth.triggerAttackRelease(notes, noteDuration);
    },
    updateChordNotes() {
      this.inversion = '0';
    }
  },
  watch: {
    chordType(newType) {
      this.localChordType = newType;
      this.updateChordNotes();
    }
  }
}
</script>

<style scoped>
.chord {
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.chord:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #333;
  margin-bottom: 15px;
}

label {
  display: block;
  margin: 10px 0 5px;
  color: #555;
}

.dropdown {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fafafa;
  margin-bottom: 10px;
  width: 100%;
  max-width: 250px;
  box-sizing: border-box;
}

.play-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.play-button:hover {
  background-color: #45a049;
}
</style>
