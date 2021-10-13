import { Paper, Typography, Grid, Chip } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import RestaurantIcon from '@mui/icons-material/Restaurant'

import useStyles from './styles'

interface RecommendationProps {
  recommendation: {
    name: string
    instagram: string
    recommendedBy: string
    city: {
      name: string
    }
    category: {
      name: string
    }
  }
}

const Recommendation = ({ recommendation }: RecommendationProps) => {
  const styles = useStyles()
  const url =
    'https://www.instagram.com/' + recommendation.instagram.replace('@', '')

  return (
    <Paper
      component="a"
      href={url}
      className={styles.post}
      target="_blank"
      rel="noreferrer"
      variant="outlined"
    >
      <Grid className={styles.content}>
        <Grid className={styles.header}>
          <Chip
            icon={<RoomIcon />}
            label={recommendation.city.name}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Chip
            icon={<RestaurantIcon />}
            label={recommendation.category.name}
            size="small"
            color="primary"
          />
        </Grid>
        <Grid
          className={styles.name}
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Typography color="primary" component="h1" variant="h6">
            {recommendation.name}
          </Typography>
          <Typography
            sx={{ fontSize: 12 }}
            color="secondary"
            component="h1"
            variant="body2"
          >
            Recomendado por {recommendation.recommendedBy}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Recommendation
