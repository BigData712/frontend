import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Stack, Button, Container, Divider, Paper, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>Crime Crunch</title>
      <meta name="description" content="Stats on Colorado Crime" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper
      elevation={3}
      style={{
        padding: 15,
        maxWidth: '80vw',
        margin: 'auto'
      }}
    >
      <Typography
        variant='h2'
        textAlign='center'
      >
        Welcome To Crime Crunch!
      </Typography>
    </Paper>
    <br/>
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md">
      <Paper 
        elevation={3}
        style={{
            margin: 'auto',
            padding: '20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div
             style={{
                  display: 'inline-block',
                 position: 'relative',
                 width: '75vw',
                 height: '45vh',
                 margin: 'auto',
                 textAlign: 'center'
             }}
         > 
           <Image loader={() => "https://ccionline.org/wp-content/uploads/2021/02/CCI-District-Map-2020.png"} style={{height: "100%", width:"100%"}}  src={'https://ccionline.org/wp-content/uploads/2021/02/CCI-District-Map-2020.png'} alt="Colorado Counties" objectFit="contain" fill/> 
         </div>
         </Box>
         <Typography variant="body2" gutterBottom textAlign='right'>
             Image Source:  <a href="https://ccionline.org/info-center-library/maps/">Colorado Counties, Inc.</a>
           </Typography>
           </Paper>
      </Container>
    </Box>
    <div
      style={{
          padding: 15,
          maxWidth: '80vw',
          margin: 'auto'
      }}
    >
      <Paper 
        elevation={3}
        style={{
            margin: 'auto',
            padding: '20px'
        }}
      >
        <Typography
            variant='h4'
            textAlign='center'
        >
            Background
        </Typography>
        <Divider/> <br/>
        <Typography
            variant='body1'
            textAlign='left'
        >
            Crime Crunch is a project created by Ash Duy, Jaryd Meek, and Noah Nguyen for ATLS 4214 - Big Data Architecture.  It utilizes data collected from 
            the National Incident-Based Reporting System (NIBRS) aggregated on the FBI Crime Data Explorer to provide 
            statistics and analysis of crime trends across Colorado. 
        </Typography>
        <br/>
        <Typography 
          variant="body1"  
          gutterBottom
        >
          To get started using Crime Crunch, go to the &apos;CHARTS&apos; page to see statistics about different counties or
          head to the &apos;ABOUT&apos; page to learn more about the project and how it works. 
        </Typography>
      </Paper>
      <br/>
      <Paper
        elevation={3}
        style={{
          margin: 'auto',
          padding: '20px'
        }}
      >
        <Typography
          variant='h4'
          textAlign='center'
        >
          Project Management
        </Typography>
        <Divider/> <br/>
        <Stack direction="row" spacing={2} justifyContent='center'>
          <Button href="https://github.com/BigData712">GitHub</Button>
          <Button href="https://github.com/orgs/BigData712/projects/1">Kanban</Button>
      </Stack>
      </Paper>
    </div>
    <br/>
    </>
  )
}
