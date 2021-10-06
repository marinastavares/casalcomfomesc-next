import React from 'react'
import { Grid, Typography } from '@mui/material'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loader from './loader.json'

import useStyles from './styles'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}
const Loading = () => {
  const styles = useStyles()

  return (
    <Grid className={styles.loading}>
      <FadeIn>
        <Grid container justify="center" direction="column">
          <Typography
            align="center"
            component="h2"
            variant="h3"
            color="primary"
          >
            Carregando comilança
          </Typography>
          <Lottie options={defaultOptions} height={240} width={240} />
        </Grid>
      </FadeIn>
    </Grid>
  )
}

export default Loading
