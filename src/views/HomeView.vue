<template>
    <div class="home">
      <h1>Chord Library</h1>

      <label for="chordType">Change All Chord Types:</label>
      <select v-model="activeChordType" id="chordType" class="dropdown">
        <option value="major">Major</option>
        <option value="minor">Minor</option>
        <option value="major7">Major 7</option>
        <option value="minor7">Minor 7</option>
        <option value="major9">Major 9</option>
        <option value="minor9">Minor 9</option>
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
    background-color: #f0f0f0;
    padding: 20px;
    min-height: 100vh;
    box-sizing: border-box;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    color: #555;
  }
  
  .dropdown {
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 10px;
    background-color: #fafafa;
    margin-bottom: 20px;
    width: 100%;
    max-width: 250px;
    box-sizing: border-box;
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
  
  @media (max-width: 480px) {
    .chord-container {
      grid-template-columns: 1fr; 
    }
  }
  </style>
  