import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { Grid, Button } from '@mui/material'

import { GET_RECOMMENDATION } from '../../lib/queries/recommendation'
import Loading from '../../components/loading'
import RecommendationDialog from '../../components/dialog/recommendation'
import RecommendationCard from '../../components/recommendation'
import AppLayout from '../../layout/app'

import useStyles from '../../styles/Recommendation'
import useBoolean from '../../hooks/useBoolean'

const Recommendation: NextPage = () => {
  const styles = useStyles()

  // Load initial posts
  const { loading, data } = useQuery(GET_RECOMMENDATION)

  // Handle recommendation modal
  const [isRecommendationModalOpen, handleRecommendationModal] =
    useBoolean(false)

  if (loading) {
    return <Loading />
  }

  return (
    <AppLayout>
      <Button
        variant="outlined"
        color="secondary"
        className={styles.filterButton}
        onClick={handleRecommendationModal}
      >
        Recomendar
      </Button>
      <Grid className={styles.post}>
        {data?.recommendations.map((recommendation) => (
          <RecommendationCard
            recommendation={recommendation}
            key={recommendation.instagram}
          />
        ))}
      </Grid>
      {isRecommendationModalOpen && (
        <RecommendationDialog onClose={handleRecommendationModal} />
      )}
    </AppLayout>
  )
}

export default Recommendation
