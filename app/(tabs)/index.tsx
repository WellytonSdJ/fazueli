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
    const audioKeys = Object.keys(audioSources) as Array<keyof Audio>;
    const currentIndex = audioKeys.findIndex((key) => audioSources[key] === currentAudio);
    const nextIndex = (currentIndex + 1) % audioKeys.length;

    player.pause();
    player.replace(audioSources[audioKeys[nextIndex]])
    setCurrentAudio(audioSources[audioKeys[nextIndex]]);
  }

  const player = useAudioPlayer(currentAudio);

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'sans-serif', fontSize: 36, textAlign: 'center', color: '#fafafa' }}>Clique e faça!</Text>
      <View
        onTouchStart={() => player.play()}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 4,
          borderRadius: 150,
          width: 300,
          height: 300,
          boxShadow: '0 2px 3.84px rgba(0,0,0,0.25)',
        }}>
        <Image source={require('@/assets/images/letra-l.png')} style={{ width: 250, height: 250 }} />
      </View>
      <Button title="Trocar audio" onPress={() => nextAudio()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f31d01f5',
    padding: 10,
    gap: 8
  },
});

