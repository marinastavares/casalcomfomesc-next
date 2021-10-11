import React from 'react'
import { Grid, Typography } from '@mui/material'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'

import * as loader from './loader.json'

import useStyles from './styles'
import useMobileDetect from '../../hooks/useMobileAgent'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loader.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

interface LoadingProps {
  imageOnly?: boolean
}

const Loading = ({ imageOnly = false }: LoadingProps) => {
  const styles = useStyles()
  const { isMobile } = useMobileDetect()

  return (
    <Grid className={styles.loading}>
      <FadeIn>
        <Grid container justify="center" direction="column">
          {!imageOnly && (
            <Typography
              align="center"
              component="h2"
              variant={isMobile ? 'h5' : 'h3'}
              color="primary"
            >
              Carregando comilança
            </Typography>
          )}
          <Lottie
            options={defaultOptions}
            height={isMobile ? 150 : 240}
            width={isMobile ? 150 : 240}
          />
        </Grid>
      </FadeIn>
    </Grid>
  )
}

export default Loading
