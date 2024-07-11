<template>
  <div class="chord card">
    <h2>{{ rootNote }}</h2>

    <label for="chordType">chord type:</label>
    <select v-model="localChordType" id="chordType" @change="updateChordNotes" class="dropdown">
      <optgroup label="major">
        <option value="major">major</option>
        <option value="major7">major 7</option>
        <option value="major9">major 9</option>
        <option value="major11">major 11</option>
        <option value="majorAdd9">major add9</option>
      </optgroup>
      <optgroup label="minor">
        <option value="minor">minor</option>
        <option value="minor7">minor 7</option>
        <option value="minor9">minor 9</option>
        <option value="minor11">minor 11</option>
        <option value="minorAdd9">minor add9</option>
      </optgroup>
      <optgroup label="dominant">
        <option value="dom7">dom 7</option>
        <option value="dom9">dom 9</option>
        <option value="dom11">dom 11</option>
      </optgroup>
      <optgroup label="augmented">
        <option value="aug">aug</option>
        <option value="aug7">aug 7</option>
      </optgroup>
      <optgroup label="diminished">
        <option value="dim">dim</option>
        <option value="dim7">dim 7</option>
      </optgroup>
    </select>

    <label for="inversion">inversion:</label>
    <select v-model="inversion" id="inversion" class="dropdown">
      <option v-for="(inv, index) in chordNotes" :value="index" :key="index">
        {{ index === 0 ? 'Root Position' : `${index}th inversion` }}
      </option>
    </select>

    <button @click="playChord" class="play-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7L8 5z" fill="#FFFFFF" />
      </svg>
    </button>
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
  background-color: #222222;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  color: #FFFFFF;
  margin-bottom: 15px;
}

label {
  display: block;
  margin: 10px 0 5px;
  color: #CCCCCC;
}

.dropdown {
  border-radius: 8px;
  border: 1px solid #555555;
  padding: 10px;
  background-color: #333333;
  color: #FFFFFF;
  margin-bottom: 10px;
  width: 100%;
  max-width: 250px;
  box-sizing: border-box;
  font-family: 'JetBrains Mono', monospace;
}

.dropdown:active,
.dropdown:focus {
  background-color: #246A73;
}

.play-button {
  background-color: #246A73;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button:hover {
  background-color: #1E5A65;
}
</style>

