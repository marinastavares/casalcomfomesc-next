import Image from 'next/image'
import { Paper, Typography, Grid, Chip, CircularProgress } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import TagIcon from '@mui/icons-material/Tag'

import { PostProps } from '../../models/post'
import { styled } from '@mui/system'
import useStyles from './styles'

const TotalScore = styled(Typography)({
  fontSize: 10,
})

const Tag = styled(Typography)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  alignItems: 'center',
  padding: 4,
  borderRadius: 4,
  fontSize: 12,
  lineHeight: 1,
}))

const Hashtag = styled(TagIcon)({
  height: 12,
  width: 12,
  color: 'white',
})

interface Post {
  post: PostProps
}

const Post = ({ post }: Post) => {
  const styles = useStyles()

  if (!post.url) {
    return null
  }
  return (
    <Paper className={styles.post}>
      <Image
        src={post.thumbnail.url}
        alt={`Imagem do post ${post.id}`}
        width="280"
        height="160"
        layout="fixed"
        className={styles.image}
      />
      <Grid className={styles.content}>
        <Grid className={styles.header}>
          <Chip
            icon={<RoomIcon />}
            label={post.restaurant.city.name}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Chip
            icon={<RestaurantIcon />}
            label={post.restaurant.category.name}
            size="small"
            color="primary"
          />
        </Grid>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography color="primary" component="h1" variant="h6">
            {post.restaurant.name}
          </Typography>
          <Typography
            className={styles.date}
            color="secondary"
            component="span"
            variant="body2"
          >
            {new Date(post.data).toLocaleString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Typography>
        </Grid>
        <Grid className={styles.bottom}>
          <Grid className={styles.progress}>
            <CircularProgress
              color="secondary"
              variant="determinate"
              value={((post.notaVinicius + post.notaMarina) * 10) / 2}
              size={60}
              thickness={2}
            />
            <Grid className={styles.score}>
              <Typography color="primary" component="p" variant="body2">
                {((post.notaVinicius + post.notaMarina) / 4).toFixed(2)}
              </Typography>
              <TotalScore color="secondary">/ 5.0</TotalScore>
            </Grid>
          </Grid>
          <Grid className={styles.tags}>
            {post.tags.map((value) => (
              <Tag key={value}>
                {' '}
                <Hashtag /> {value}
              </Tag>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Post
