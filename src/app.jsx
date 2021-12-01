import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { useState, useEffect, useRef } from 'preact/hooks';
import Loader from 'react-loader-spinner';
import {Box, Button, Grid, Text, Input, Flex, Tooltip } from '@chakra-ui/react';
import VideoPlayer from './videoPlayer';
import { BiHelpCircle } from 'react-icons/bi'
import Footer from './components/footer'

const ffmpeg = createFFmpeg({ log: true });

export function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState('')
  const [loading, setLoading] = useState(false)
  const [duration, setDuration] = useState('3')
  const [clip, setClip] = useState('2')
  const playerRef = useRef(null);
  const load = async () => {
    await ffmpeg.load()
    setReady(true)
  }

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    setGif('')
  }, [video])

  const convertToGif = async () => {

    setLoading(true)
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    await ffmpeg.run('-i', 'test.mp4', '-t', duration, '-ss', '2.0', '-f', 'gif', 'out.gif', '-vcodec', 'libx265', '-crf', '28');
    const data = ffmpeg.FS('readFile', 'out.gif')

    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
    setGif(url)

    if (gif !== '') {
      setLoading(false)
    }
  }
  return (
    <>
      {ready ? (
        /* @ts-ignore */
        <Grid direction='column' justifyContent='center' textAlign='center'>
          <Text fontSize='5xl'>Welcome to MPGif!</Text>
          <Text fontSize='3xl'>Convert your Videos to Gifs!</Text>
          <Box>  <Text fontSize='2xl'>
            Smaller the file, faster the conversion
          </Text>
          <Text>
            also depends on your computer speed
        </Text> </Box>

          {/* @ts-ignore */}
          <input type='file' onChange={(e) => setVideo(e?.target?.files?.item(0))} hidden id='upload-button' accept="video/mp4,video/x-m4v,video/*" />
          <Button maxW='fit-content' mx='120px' mb='20px'><label htmlFor="upload-button">Choose your file</label></Button>
          {video &&
            <VideoPlayer options={{
              autoplay: true,
              controls: true,
              responsive: true,
              fluid: true,
              sources: [{
                src: URL.createObjectURL(video),
                type: 'video/mp4'
              }]
            }} onReady={handlePlayerReady} />
          }
          <Flex>
            <label htmlFor='duration' style={{ marginRight: 5, marginTop: 5 }}>Duration</label>
            <Input value={duration} onChange={(e) => setDuration(e.target.value)} id='duration' />
            <Tooltip hasArrow label='Duration of the clip that will be a part of the gif'>
              {/* @ts-ignore */}
              <Button><BiHelpCircle style={{ width: '70%', height: '70%' }} /></Button>
            </Tooltip>
          </Flex>
          <Flex>
            <label htmlFor='clip' style={{ marginRight: 5, marginTop: 5 }}>Clip</label>
            <Input value={clip} onChange={(e) => setClip(e.target.value)} id='clip' />

            <Tooltip hasArrow label='Amount to be removed at the begining of the clip'>
              {/* @ts-ignore */}
              <Button><BiHelpCircle style={{ width: '70%', height: '70%' }} /></Button>
            </Tooltip>
          </Flex>
          <Button onClick={convertToGif} colorScheme='green' marginTop='50px' maxW='300px' mx='50px' marginBottom='40px'>Convert!</Button>




          {loading && (
            <Grid placeItems='center' mt='20px'>

              {/* @ts-ignore */}
              <Loader
                color="#00Bfff"
                type="Oval"
                height={100}
                width={100}
                timeout={3000}
              />

            </Grid>
          )
          }
          {
            gif && (
              <>
                <Text fontSize='4xl'>Result</Text>
                <img src={gif} style={{ maxWidth: '500px', maxHeight: '950px' }} />
                <Button maxWidth='fit-content' mx='140px' mt='20px'><a href={gif} download>Download your gif</a></Button>
              </>

            )}


        </Grid>)
        : <h1>Loading....</h1>
      }

      <Footer />
    </>
  )
}
