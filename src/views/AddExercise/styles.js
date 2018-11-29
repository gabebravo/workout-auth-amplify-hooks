const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    marginTop: '1.3rem',
    minWidth: 353,
    maxWidth: 300,
    [theme.breakpoints.only('xs')]: {
      marginTop: '1.3rem',
      minWidth: 280,
      maxWidth: 300,
    },
  },
  textFieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textField_1: {
    width: '100%',
  },
  textField_2: {
    width: 'calc(50% - 10px)'
  },
  textField_3: {
    width: 'calc(33.25% - 10px)'
  },
  textField_4: {
    width: 'calc(25% - 10px)'
  },
  textField_5: {
    width: 'calc(20% - 10px)'
  },
  modalStyles: {
    fontSize: '1.2rem',
    margin: '.5rem'
  },
  href: {
    textDecoration: 'none'
  }
});