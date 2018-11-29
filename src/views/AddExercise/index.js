import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo'
import { getExerciseNames } from '../../queries';
import { Mutation } from 'react-apollo'
import { ADD_EXERCISE } from '../../mutations';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styles, MenuProps } from './styles'
import withStyles from '@material-ui/core/styles/withStyles';
import Header from '../../shared/Header';
import { withRouter } from "react-router";
import _pick from 'lodash/pick';

const keys = {
  weights: ['userId', 'workoutId', 'category', 'bodyPart', 'name', 
    'date', 'sets', 'reps', 'weight'],
  
  [`body-weight`]: ['userId', 'workoutId', 'category', 'bodyPart', 'name', 
    'date', 'sets', 'reps'],
  
  cardio: ['userId', 'workoutId', 'category', 'bodyPart', 'name', 
    'date', 'miles', 'minutes']
}


const categories = [
  'weights',
  'cardio',
  'body-weight',
];

const bodyParts = [
  'shoulders',
  'arms',
  'chest',
  'back',
  'abs',
  'legs',
];

const setsOptions = [1, 2, 3, 4, 5];

const DEFAULT_STATE = {
  category: '',
  bodyPart: '',
  name: '',
  sets: 0,
  reps: [],
  weight: [],
  miles: 0,
  minutes: 0,
  showModal: false,
  categoryError: false,
  bodyPartError: false,
  nameError: false,
  setsError: false,
  repsError: false,
  weightError: false,
  milesError: false,
  minutesError: false,
}

class AddExercise extends Component {
  state = {userId: '', workoutId: '', date: '', ...DEFAULT_STATE};

  componentDidMount(){
    const { userId, workoutId, date } = this.props.match.params
    this.setState({ userId, workoutId, date })
  }
  
  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  dashNav = () => {
    const { userId } = this.props.match.params
    this.props.history.push(`/dashboard/${userId}`);
  }

  submit = () => {
    if( !this.state.category ) {
      this.setState({ categoryError: true });
    }
    if( !this.state.bodyPart ) {
      this.setState({ bodyPartError: true });
    }
    if( !this.state.name ) {
      this.setState({ nameError: true });
    }
    if( (this.state.category === 'weight' || this.state.category === 'body-weight') && !this.state.sets ) {
      this.setState({ setsError: true });
    }
    else if( (this.state.category && this.state.bodyPart && this.state.name) || this.state.sets) {
      this.openModal()
    }
  }

  handleChange = event => {
    if( this.state[`${event.target.name}Error`] && event.target.value ) {
      this.setState({ [`${event.target.name}Error`]: false });
    } 
    else if( event.target.name === 'minutes' || event.target.name === 'miles' ) {
      this.setState({ [event.target.name]: Number(event.target.value) });
    } 
    else if( event.target.name === 'weight' || event.target.name === 'reps' ) {
      const newArrayValues = [...this.state[event.target.name]]
      newArrayValues[event.target.id] = Number(event.target.value);
      this.setState({ [event.target.name]: newArrayValues });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  resetState = () => {
    this.setState({ ...DEFAULT_STATE })
  }

  renderSetsField = () => {
    const { classes } = this.props;
    return (
      <FormControl required error={this.state.setsError}
        className={classes.formControl}>
        <InputLabel>Sets</InputLabel>
          <Select
            value={this.state.sets}
            onChange={this.handleChange}
            input={<Input name="sets" />}
            MenuProps={MenuProps}
          >
            {setsOptions.map(set => (
              <MenuItem
                key={set}
                value={set}
              >
                {set}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    )
  }

  buildFields = ( sets, type ) => {
    const { classes } = this.props;
    const TextFieldArray = [];
    for( let i = 0; i < sets; i++ ){
      const CurrentTextField = (
        <FormControl key={i} margin="normal" error={this.state.milesError}
          required className={classes[`textField_${sets}`]}>
          <InputLabel>{`Set ${i + 1}`}</InputLabel>
          <Input name={type} autoComplete="miles" autoFocus id={String(i)}
            value={this.state[type][i] || ''} onChange={this.handleChange} placeholder={type} />
        </FormControl>
      )
      TextFieldArray.push(CurrentTextField)
    } return TextFieldArray;
  }

  renderWeightFields = () => {
    const { classes } = this.props;
    const TextFieldArray = this.buildFields(this.state.sets, 'weight')
    return (
      <Fragment>
        {this.renderBodyWeightFields()}
        <div className={classes.textFieldWrapper}>
          { TextFieldArray }
        </div>
      </Fragment>
    )
  }

  renderBodyWeightFields = () => {
    const { classes } = this.props;
    const TextFieldArray = this.buildFields(this.state.sets, 'reps')
    return (
      <Fragment>
        <div className={classes.textFieldWrapper}>
          { TextFieldArray }
        </div>
      </Fragment>
    )
  }

  renderCardioFields = () => (
    <Fragment>
      <FormControl margin="normal" error={this.state.milesError}
        required fullWidth>
        <InputLabel>Miles</InputLabel>
        <Input name="miles" autoComplete="miles" autoFocus 
          value={this.state.miles} onChange={this.handleChange} />
      </FormControl>
      <FormControl margin="normal" error={this.state.minutesError}
        required fullWidth>
        <InputLabel>Minutes</InputLabel>
        <Input name="minutes" autoComplete="minutes" autoFocus 
          value={this.state.minutes} onChange={this.handleChange} />
      </FormControl>
    </Fragment>
  )

  formatSubmitObj = state => {
    const stateCopy = {...this.state}
    const pluckedStateCopy = _pick(stateCopy, keys[stateCopy.category]);
    return pluckedStateCopy
  }

  renderCategoryFields = category => {
    const { classes } = this.props; 
    return (
      category === 'cardio' ?
        <Fragment>
          <DialogContentText className={classes.modalStyles}>
            <span>{`minutes: ${this.state.minutes}`}</span>
          </DialogContentText>
          <DialogContentText className={classes.modalStyles}>
            <span>{`miles: ${this.state.miles}`}</span>
          </DialogContentText>
        </Fragment> : this.state.category === 'weights' ?
          <Fragment>
          <DialogContentText className={classes.modalStyles}>
            <span>{`reps: ${this.state.reps}`}</span>
          </DialogContentText>
          <DialogContentText className={classes.modalStyles}>
            <span>{`weights: ${this.state.weight}`}</span>
          </DialogContentText>
        </Fragment> : <DialogContentText className={classes.modalStyles}>
            <span>{`reps: ${this.state.reps}`}</span>
          </DialogContentText>
    )
  }

  renderModal = () => {
    const { classes } = this.props;
    return (
      <Dialog
          open={this.state.showModal}
          onClose={this.closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Exercise Details"}</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.modalStyles}>
              <span>{`category: ${this.state.category}`}</span>
            </DialogContentText>
            <DialogContentText className={classes.modalStyles}>
              <span>{`body part: ${this.state.bodyPart}`}</span>
            </DialogContentText>
            <DialogContentText className={classes.modalStyles}>
              <span>{`name: ${this.state.name}`}</span>
            </DialogContentText>
            {
              this.renderCategoryFields(this.state.category)
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeModal} color="primary">
              Cancel
            </Button>
            { this.renderSaveButton() }
          </DialogActions>
        </Dialog>
    )
  }

  renderExerciseName = bp => {
    return (
      <Query query={getExerciseNames} variables={{ 
        filter: {
          bodyPart: {
            eq: bp
          }
        }
        }}>
        {({ data }) => {
          return (
            <Fragment>
              <InputLabel>Name</InputLabel>
              <Select
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input name="name" />}
                MenuProps={MenuProps}
              >
              {data && data.listExerciseDefs && data.listExerciseDefs.items
                && data.listExerciseDefs.items.map(item => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
        )}}
      </Query>
    )
  }

  renderSaveButton = () => {
    const input = this.formatSubmitObj(this.state);
    return (
      <Mutation mutation={ADD_EXERCISE}>
        {createExercise => (
          <Button color="primary" autoFocus 
            onClick={() => createExercise({ 
              variables: { input }
          }).then( res => res && this.resetState() )}>
            Save
          </Button>
        )}
      </Mutation>
    )
  }

  render() {
    const { classes } = this.props;
    
    return (
      <React.Fragment>
      <CssBaseline />
      <Header />
      <div>
        <a className={classes.href} href={`/dashboard/${this.props.match.params.userId}`}>
          <Button
            onClick={ () => window.location.reload() }
            color="primary"
          >Back</Button>
        </a>
      </div>
      <main className={classes.layout}>
      { this.renderModal() }
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PlaylistAddCheck />
          </Avatar>
          <Typography>Add Workout</Typography>
          <form className={classes.form}>
          <FormControl required error={this.state.categoryError}
            className={classes.formControl}>
            <InputLabel>Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange}
                input={<Input name="category" />}
                MenuProps={MenuProps}
              >
                {categories.map(category => (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required error={this.state.bodyPartError}
              className={classes.formControl}>
            <InputLabel>Body Part</InputLabel>
              <Select
                value={this.state.bodyPart}
                onChange={this.handleChange}
                input={<Input name="bodyPart" />}
                MenuProps={MenuProps}
              >
                {bodyParts.map(bodyPart => (
                  <MenuItem
                    key={bodyPart}
                    value={bodyPart}
                  >
                    {bodyPart}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl required error={this.state.nameError}
              className={classes.formControl}>
              { this.state.bodyPart && this.renderExerciseName(this.state.bodyPart) }
            </FormControl>
            {
              (this.state.category === 'weights' || this.state.category === 'body-weight') && this.state.name ?
                this.renderSetsField() : this.state.category === 'cardio' ? this.renderCardioFields() : null
            }
            {
                this.state.sets > 0 ? this.state.category === 'weights' ? this.renderWeightFields() :
                  this.state.category === 'body-weight' ? this.renderBodyWeightFields() : null : null
            }
            <Button
              onClick={this.submit}
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
              Add Exercise
            </Button>
            {
              this.state.category || this.state.bodyPart || this.state.name ? 
              (
                <Button
                  onClick={this.resetState}
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Form
                </Button>
              ) : null
            }
          </form>
        </Paper>
      </main>
    </React.Fragment>
    )
  }
}

AddExercise.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AddExercise));

