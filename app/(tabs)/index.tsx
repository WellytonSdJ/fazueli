import { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

// const audioSource = require('@/assets/media/bordao.mp3');

export default function App() {
  const [audioSource, setAudioSource] = useState(null)
  const [audioList, setAudioList] = useState([])

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const mediaPath = require.context('@/assets/media', false, /\.(mp3|wav)$/);
        const files: { name: string; path: string }[] = mediaPath.keys().map((key) => ({
          name: key.replace('./', ''),
          path: mediaPath(key),
        }));
        setAudioList(files);
      } catch (error) {
        console.error('Error fetching audio files:', error);
      }
    };

    fetchAudioFiles();
  }, []);

  console.log(audioList)

  const player = useAudioPlayer(audioSource);

  return (
    <View style={styles.container}>
      {/* <Image source={require('@/assets/media/letra-l.png')} style={{ width: 300, height: 300 }} />       */}
      {/* <Button title="Apenas Faça" onPress={() => player.play()} /> */}
      <h1>Apenas faça!</h1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f30101',
    padding: 10,
  },
});
