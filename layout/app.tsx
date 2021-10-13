import { ReactNode, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Grid, Typography, Link as MUILink } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import { ToastContainer } from 'react-toastify'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import ProfilePicture from '../assets/foto1.png'
import useMobileDetect from '../hooks/useMobileAgent'

import useStyles from '../styles/styles'
import { pageview } from '../utils/ga'

import { styled } from '@mui/material/styles'

const Header = styled(Grid)(({ theme }) => ({
  gridArea: 'header',
  backgroundColor: theme.palette.primary.main,
  padding: 32,
  marginBottom: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}))

const MainInfo = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}))

const Links = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}))

const App = ({ children }: { children: ReactNode }) => {
  const styles = useStyles()
  const { isMobile } = useMobileDetect()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>@casalcomfomesc</title>
        <meta
          name="description"
          content="O site que você pode visualizar e filtrar todos os posts feito pelo casal Tavazetta 🍔🍟🍕🌯🍝🍣"
        />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>

      <main className={styles.main}>
        <Header>
          <MainInfo>
            <Link href="/">
              <a>
                <Image
                  className={styles.image}
                  height={isMobile ? 120 : 48}
                  width={isMobile ? 120 : 48}
                  src={ProfilePicture}
                  alt="Profile"
                />
              </a>
            </Link>
            <a
              href="https://www.instagram.com/casalcomfomesc"
              alt="Nosso instagram"
              className={styles.icon}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <Typography component="h1" className={styles.titleHeader}>
              @casalcomfomesc
            </Typography>
          </MainInfo>
          <Links>
            <Link href="/">
              <a
                className={clsx(styles.link, {
                  [styles.underlined]: !router.asPath.includes('recomendacoes'),
                })}
              >
                Feed
              </a>
            </Link>
            <Link href="/recomendacoes">
              <a
                className={clsx(styles.link, {
                  [styles.underlined]: router.asPath.includes('recomendacoes'),
                })}
              >
                Recomendações
              </a>
            </Link>
          </Links>
        </Header>{' '}
        <Grid className={styles.content}>{children}</Grid>
        <ToastContainer />
      </main>
    </>
  )
}

export default App
