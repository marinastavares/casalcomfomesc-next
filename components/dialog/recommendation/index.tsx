import {
  useState,
  useCallback,
  ChangeEvent,
  FormEventHandler,
  FocusEventHandler,
} from 'react'
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import { styled } from '@mui/material/styles'
import { SelectChangeEvent } from '@mui/material/Select'
import { toast } from 'react-toastify'

import { GET_ALL_FILTERS_OPTIONS } from '../../../lib/queries/filter'
import Dialog from '../index'
import Loading from '../../loading'
import { DialogProps } from '../types'
import Dropdown from './dropdown'
import { CREATE_RECOMMENDATION } from '../../../lib/queries/recommendation'

import 'react-toastify/dist/ReactToastify.css'

interface RecommendationModalProps extends DialogProps {
  getNewPosts: () => void
}

const Content = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.up('md')]: {
    minWidth: 500,
    minHeight: 400,
  },
}))

const RECOMMENDATION_FIELDS = {
  NAME: 'name',
  INSTAGRAM: 'instagram',
  CITY: 'city',
  CATEGORY: 'category',
  RECOMMENDED_BY: 'recommendedBy',
}

const INITIAL_STATE = Object.values(RECOMMENDATION_FIELDS).reduce(
  (acc, current: string) => ({ ...acc, [current]: '' }),
  {}
)

const RECOMMENDATION_LABEL = {
  [RECOMMENDATION_FIELDS.NAME]: 'Nome do Restaurante',
  [RECOMMENDATION_FIELDS.INSTAGRAM]: 'Instagram do Restaurante',
  [RECOMMENDATION_FIELDS.CITY]: 'Cidade',
  [RECOMMENDATION_FIELDS.CATEGORY]: 'Categoria',
  [RECOMMENDATION_FIELDS.RECOMMENDED_BY]:
    'Deixe seu instagram para darmos feedback',
}

const CustomizedDialogs = ({
  onClose,
}: Omit<RecommendationModalProps, 'children'>) => {
  const { data, loading } = useQuery(GET_ALL_FILTERS_OPTIONS)
  const [createRecommendation, { loading: isSendingForm }] = useMutation(
    CREATE_RECOMMENDATION,
    {
      onCompleted: () => {
        onClose()
        toast('Recomendação feita com sucesso, valeuuuu', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      },
      onError: () => {
        toast.error('Alguma coisa deu errado, tente novamente mais tarde', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      },
    }
  )

  const [values, setValues] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState(INITIAL_STATE)

  const handleChange = useCallback(
    (
      event:
        | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        | SelectChangeEvent
    ) => {
      const { name, value } = event.target
      setValues((prevValues) => ({ ...prevValues, [name]: value }))
    },
    []
  )

  const onBlur = useCallback(
    (event: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.target
      setErrors((prevValues) => ({
        ...prevValues,
        [name]: !values[name]?.length,
      }))
    },
    [values]
  )

  const handleForm = useCallback(
    (event: FormEventHandler<HTMLFormElement>) => {
      event.preventDefault()
      if (Object.values(errors).some((value) => value)) {
        return
      }
      createRecommendation({ variables: values })
    },
    [createRecommendation, errors, values]
  )

  return (
    <Dialog onClose={onClose} title="Envie uma recomendação">
      {loading ? (
        <Loading imageOnly />
      ) : (
        <form onSubmit={handleForm}>
          <Content dividers>
            <Typography component="h3" variant="body2">
              Estamos sempre aberto a recomendações de novos lugares para
              experimentar! Deixe aqui a sua sugestão para explorarmos o quanto
              antes
            </Typography>
            {Object.values(RECOMMENDATION_FIELDS).map((name: string) => {
              if (
                name === RECOMMENDATION_FIELDS.CATEGORY ||
                name === RECOMMENDATION_FIELDS.CITY
              ) {
                return (
                  <Dropdown
                    key={name}
                    value={values[name]}
                    label={RECOMMENDATION_LABEL[name]}
                    onChange={handleChange}
                    options={
                      name === RECOMMENDATION_FIELDS.CITY
                        ? data.cities
                        : data.categories
                    }
                    name={name}
                    error={errors[name]}
                    helperText={errors[name] && 'Campo obrigatório'}
                    onBlur={onBlur}
                  />
                )
              }

              return (
                <TextField
                  variant="outlined"
                  key={name}
                  value={values[name]}
                  error={errors[name]}
                  helperText={errors[name] && 'Campo obrigatório'}
                  label={RECOMMENDATION_LABEL[name]}
                  onChange={handleChange}
                  onBlur={onBlur}
                  name={name}
                />
              )
            })}
          </Content>
          <DialogActions>
            <Button type="submit">
              {isSendingForm ? (
                <CircularProgress color="secondary" />
              ) : (
                'Enviar'
              )}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  )
}

export default CustomizedDialogs
