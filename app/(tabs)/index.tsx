import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Image, Platform, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useAudioPlayer } from 'expo-audio';

interface Audio {
  bordao: string;
  dilera: string;
  explosao: string;
  luanGameplays: string;
  vemSeLascar: string;
}

const mediaPath = '@/assets/media/';

const audioSources: Audio = {
  bordao: require(`${mediaPath}bordao.mp3`),
  dilera: require(`${mediaPath}dilera.mp3`),
  explosao: require(`${mediaPath}explosao.mp3`),
  luanGameplays: require(`${mediaPath}luan-gameplays.mp3`),
  vemSeLascar: require(`${mediaPath}vem-se-lascar.mp3`),
};

export default function App() {
  const [currentAudio, setCurrentAudio] = useState<string>(audioSources.bordao);

  const nextAudio = () => {
  // Get the keys of the audioSources object as an array
  const audioKeys = Object.keys(audioSources) as Array<keyof Audio>;
  // Find the index of the current audio in the keys array
  const currentIndex = audioKeys.findIndex((key) => audioSources[key] === currentAudio);
  // Calculate the index of the next audio, wrapping around to the first if at the end
  const nextIndex = (currentIndex + 1) % audioKeys.length;
  console.log({nextIndex});

  player.pause();

  player.replace(audioSources[audioKeys[nextIndex]])
  // Set the currentAudio to the next audio
  console.log(audioSources[audioKeys[nextIndex]]);
  setCurrentAudio(audioSources[audioKeys[nextIndex]]);

  }

  const player = useAudioPlayer(currentAudio);
  
  return (
    <View style={styles.container}>      
      <View style={{ alignItems: 'center' }}>
        <Image source={require('@/assets/images/letra-l.png')} style={{ width: 300, height: 300 }} />
      </View>

      <Button title="Apenas Faça" onPress={() => player.play()}  />
      <Button title="Apenas TROQUE" onPress={() => nextAudio()}  />

      <Text style={{ fontSize: 24 }}>Apenas faça!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f31d01f5',
    padding: 10,
    gap: 8
  },
});
