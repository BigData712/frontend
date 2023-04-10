import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Paper
      elevation={0}
      style={{
        margin: 'auto',
        padding: '20px'
      }}
    >
      <Typography
        variant='h2'
        textAlign='center'
      >
        Welcome to Crime Crunch!
      </Typography>
    </Paper>
      
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
                position: 'relative',
                width: '70vw',
                height: '70vh',
                margin: 'auto',
                textAlign: 'center'
            }}
        > 
          <Image loader={() => "https://ccionline.org/wp-content/uploads/2021/02/CCI-District-Map-2020.png"} style={{height: "100%", width:"100%"}}  src={'https://ccionline.org/wp-content/uploads/2021/02/CCI-District-Map-2020.png://opensearch.org/assets/opensearch-twitter-card.png'} alt="Colorado Counties" fill/> 
        </div>
        </Box>
        <Box
          textAlign={'right'}
        >
           <Typography variant="body2" gutterBottom>
            Image Source:  <a href="https://ccionline.org/info-center-library/maps/">Colorado Counties, Inc.</a>
          </Typography>
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Background
          </Typography>
          <Typography variant="body1" gutterBottom>
            Crime Crunch is a project created for ATLS 4214 - Big Data Architecture.  It utilizes data collected from 
            the National Incident-Based Reporting System (NIBRS) aggregated on the FBI Crime Data Explorer to provide 
            statistics and analysis of crime trends across Colorado. 
          </Typography>
          <br/>
          <Typography variant="body1" gutterBottom>
            To get started using Crime Cruncher, go to the 'CHARTS' page to see statistics about different counties or
            head to the 'ABOUT' page to learn more about the project and how it works. 
          </Typography>
        </Box>
        <Paper
          elevation={0}
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
        </Paper>
        <Divider/> <br/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" href="https://github.com/BigData712" target="_blank" rel="noopener">
            GitHub Org
          </Button>
          <Button variant="outlined" href="https://github.com/orgs/BigData712/projects/1" target="_blank" rel="noopener" sx={{ ml: 2 }}>
            Kanban
          </Button>
        </Box>
      </Container>
    </Box>
    <br/>
    </>
  )
}
