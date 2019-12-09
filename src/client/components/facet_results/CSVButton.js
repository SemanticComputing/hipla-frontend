import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CSVLink } from 'react-csv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csvLink: {
    textDecoration: 'none'
  },
  csvButton: {
    margin: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

let CSVButton = props => {
  const { classes, strings } = props;

  return (
    <div className={classes.root}>
      <CSVLink className={classes.csvLink} data={props.results}>
        <Button variant="contained" color="primary" className={classes.csvButton}>
          {strings.resultsAsCSV}
          <CloudDownloadIcon className={classes.rightIcon} />
        </Button>
      </CSVLink>
    </div>
  );
};

CSVButton.propTypes = {
  classes: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  strings: PropTypes.object.isRequired
};

export default withStyles(styles)(CSVButton);
