<template>
  <div class="home">
    <label for="chordType">change all chord types:</label>
    <select v-model="activeChordType" id="chordType" class="dropdown">
      <option value="major">major</option>
      <option value="minor">minor</option>
      <option value="major7">major 7</option>
      <option value="minor7">minor 7</option>
      <option value="major9">major 9</option>
      <option value="minor9">minor 9</option>
    </select>

    <div class="chord-container">
      <ChordComponent
        v-for="(chord, note) in chordData"
        :key="note"
        :rootNote="note"
        :chordData="chordData"
        :chordType="activeChordType"
      />
    </div>
  </div>
</template>

<script>
import ChordComponent from '../components/ChordComponent.vue';
import { chords } from '../chords';

export default {
  name: 'HomeView',
  components: {
    ChordComponent
  },
  data() {
    return {
      chordData: chords,
      activeChordType: 'major'
    };
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #121212;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

h1 {
  color: #FFFFFF;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #CCCCCC;
}

.dropdown {
  border-radius: 8px;
  border: 1px solid #555555;
  padding: 10px;
  background-color: #333333;
  color: #FFFFFF;
  margin-bottom: 20px;
  width: 100%;
  max-width: 250px;
  box-sizing: border-box;
  font-family: 'JetBrains Mono', monospace;
}

.dropdown:focus {
  background-color: #246A73;
}

.chord-container {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  max-width: 100%;
  padding: 0 10px;
}

@media (max-width: 1200px) {
  .chord-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .chord-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .dropdown {
    max-width: 300px;
  }

  .chord-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>