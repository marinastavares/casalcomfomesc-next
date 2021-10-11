import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { DialogProps } from './types'
import useMobileDetect from '../../hooks/useMobileAgent'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root-MuiDialog-paper': {
    [theme.breakpoints.up('lg')]: {
      minWidth: 500,
    },
  },
}))

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}))

export interface DialogTitleProps extends DialogProps {
  id: string
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <CustomDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="fechar modal"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </CustomDialogTitle>
  )
}

const CustomizedDialogs = ({
  children,
  onClose,
  title = 'Filtos',
}: DialogProps) => {
  const { isMobile } = useMobileDetect()
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="filtros-disponiveis"
      open
      fullScreen={isMobile}
    >
      <BootstrapDialogTitle id="filtros-disponiveis" onClose={onClose}>
        {title}
      </BootstrapDialogTitle>
      {children}
    </BootstrapDialog>
  )
}

export default CustomizedDialogs
