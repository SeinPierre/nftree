import React, { useState } from 'react';
import './App.css';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

import wasm from 'wasm';
import {fib,add_two_ints,tree} from 'wasm';

import { useWeb3React } from "@web3-react/core";
// import { injected } from "./wallet/Connect";
// import web3 from "web3";
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { provider } from 'web3-core';
// import { argv0 } from 'process';

function getLibrary(provider: provider) {
  return new Web3(provider)
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const cards = [
  {
    key:1,
    name:"TOTO",
    value:"toto"
  },
  {
    key:2,
    name:"TATA",
    value:"tata"
  }
]

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

async function connect(activate: (arg0: InjectedConnector) => any) {
  
  console.log("Connect clicked!")
  try {
    await activate(injected);
  } catch (ex) {
    console.log(ex)
  }
}

async function disconnect(deactivate: (arg0: InjectedConnector) => any){
  console.log("Disconnect clicked!")
  try {
    await deactivate(injected);
  } catch (ex) {
    console.log(ex)
  }

}

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

async function returnValues(setSum: { (value: React.SetStateAction<number>): void; (arg0: number): void; },setFib: { (value: React.SetStateAction<number>): void; (arg0: number): void; }){
  await wasm();
  
  const sumResult = await add_two_ints(10, 20);
  const fibResult = await fib(10);
  // updating our sumResult and fibResult values (declared below)
  
  setSum(sumResult);
  setFib(fibResult);

}

async function drawNFTs(){
  for(let i= 0; i <cards.length; i++){
    await tree(cards[i].key.toString());
  }
}

function App() {

  const { active, account, library, activate,deactivate } = useWeb3React()
  const [sum, setSum] = useState<number>(0);
  const [fibo, setFib] = useState<number>(0);

  returnValues(setSum,setFib)
  drawNFTs()


  console.log(sum,fibo);
  
  return ( 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <CameraIcon sx={{ mr: 2 }} />
          {/* <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography> */}

          {(active) ?
            <Typography variant="h6" color="inherit" noWrap>Welcome {account}</Typography>
            : <Typography variant="h6" color="inherit" noWrap>NFTree</Typography>
          }          
          
          {(active) ?
            <Button variant="contained" onClick={()=>disconnect(deactivate)}>Disconnect</Button>
            : <Button type="button" onClick={()=>connect(activate)} variant="contained">Connect Wallet</Button>
          }
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {/* <div>Sum Results: {sum}</div>
          <div>Fib Results: {fibo}</div> */}
          
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          {/* <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Welcome {account}.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container> */}
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <><canvas id={card.key.toString()} key={card.key}></canvas></>
                  {/* <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random" /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      {card.value}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button>
    <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>   
  );
}


export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}
// export default App;
