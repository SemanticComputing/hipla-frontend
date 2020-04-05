import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import ResultFilterDialogSingle from './ResultFilterDialogSingle';
import IconButton from '@material-ui/core/IconButton'
import PlaceIcon from '@material-ui/icons/Place'
import { has } from 'lodash'
import {
  AutoSizer,
  Column,
  Table,
  SortIndicator
} from 'react-virtualized'

// https://github.com/bvaughn/react-virtualized/issues/650
// https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md

const styles = () => ({
  root: {
    display: 'flex',
    height: 'calc(100% - 74px)',
    width: 'calc(100% - 1px)',
    flexGrow: 1
  },
  resultsInfo: {
    flexGrow: 0
  }
})

const tableStyles = {
  tableRoot: {
    fontFamily: 'Roboto'
  },
  headerRow: {
    textTransform: 'none',
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },
  evenRow: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
    // backgroundColor: '#fafafa'
  },
  oddRow: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)'
  },
  noRows: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1em',
    color: '#bdbdbd'
  }
}

const columnWidth = 115

const calculateRowStyle = ({ index }) => {
  if (index < 0) {
    return tableStyles.headerRow
  } else {
    return index % 2 === 0 ? tableStyles.evenRow : tableStyles.oddRow
  }
}

class VirtualizedTable extends React.PureComponent {
  constructor (props) {
    super(props)
    this._noRowsRenderer = this._noRowsRenderer.bind(this)
    this._sort = this._sort.bind(this)
  }

  render () {
    const { classes, list, strings } = this.props
    const rowGetter = ({ index }) => this._getDatum(list, index)

    const headerRenderer = ({
      dataKey,
      label,
      sortBy,
      sortDirection
    }) => {
      const showSortIndicator = sortBy === dataKey
      const children = [
        <span
          className='ReactVirtualized__Table__headerTruncatedText'
          style={showSortIndicator ? {} : { marginRight: 16 }}
          key='label'
          title={label}
        >
          {label}
        </span>
      ]
      if (showSortIndicator) {
        children.push(
          <SortIndicator key='SortIndicator' sortDirection={sortDirection} />
        )
      }
      return children
    }

    const labelRenderer = ({ cellData, rowData }) => {
      if (cellData == null) return ''
      const label = <a target='_blank' rel='noopener noreferrer' href={rowData.id}>{cellData}</a>

      let marker = ''
      if (typeof rowData.lat !== 'undefined' || typeof rowData.long !== 'undefined') {
        // onMouseOver={handleMarkerMouseOver(rowData.s)}
        // onMouseOut={handleMarkerMouseOut(rowData.s)}
        // onClick={handleMarkerClick(rowData.s)}

        marker = (
          <IconButton
            disabled
            aria-label='Marker'
          >
            <PlaceIcon />
          </IconButton>
        )
      }
      return (
        <div key={rowData.id}>
          {label}{marker}
        </div>
      )
    }

    const sourceRenderer = ({ cellData, rowData }) => {
      if (cellData == null) return ''
      return (
        <div key={rowData.s}>
          <a target='_blank' rel='noopener noreferrer' href={rowData.namesArchiveLink}>{cellData}</a>
        </div>
      )
    }

    // const handleMarkerClick = value => () => {
    //   this.props.openMarkerPopup(value);
    // };
    //
    // const handleMarkerMouseOver = value => () => {
    //   this.props.bounceMarker(value);
    // };
    //
    // const handleMarkerMouseOut = () => () => {
    //   this.props.removeTempMarker();
    // };

    return (
      <div className={classes.root}>
        {this.props.list.size > 0 &&
          <div style={{ flex: '1 1 auto' }}>
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  overscanRowCount={10}
                  rowHeight={40}
                  rowGetter={rowGetter}
                  rowCount={this.props.list.size}
                  sort={this._sort}
                  sortBy={this.props.search.sortBy}
                  sortDirection={this.props.search.sortDirection.toUpperCase()}
                  width={width}
                  height={height}
                  headerHeight={50}
                  noRowsRenderer={this._noRowsRenderer}
                  style={tableStyles.tableRoot}
                  rowStyle={calculateRowStyle}
                >
                  <Column
                    label={strings.name}
                    cellDataGetter={({ rowData }) => rowData.prefLabel}
                    dataKey='prefLabel'
                    headerRenderer={headerRenderer}
                    cellRenderer={labelRenderer}
                    width={columnWidth + 70}
                  />
                  <Column
                    label={strings.type}
                    cellDataGetter={({ rowData }) => has(rowData, 'broaderTypeLabel') ? rowData.broaderTypeLabel.toLowerCase() : ''}
                    dataKey='broaderTypeLabel'
                    headerRenderer={headerRenderer}
                    width={columnWidth + 10}
                  />
                  {/* <Column
                    label="NA type"
                    cellDataGetter={({rowData}) => has(rowData,'typeLabel') ? rowData.typeLabel.toLowerCase() : ''}
                    dataKey="typeLabel"
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  /> */}
                  <Column
                    label={strings.area}
                    cellDataGetter={({ rowData }) => rowData.broaderAreaLabel}
                    dataKey='broaderAreaLabel'
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  />
                  <Column
                    label={strings.modifier}
                    cellDataGetter={({ rowData }) => rowData.modifier}
                    dataKey='modifier'
                    headerRenderer={headerRenderer}
                    width={columnWidth + 10}
                  />
                  <Column
                    label={strings.base}
                    cellDataGetter={({ rowData }) => rowData.basicElement}
                    dataKey='basicElement'
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  />
                  {/*
                  <Column
                    label="Collector"
                    cellDataGetter={({rowData}) => rowData.collector}
                    dataKey="collector"
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  /> */}
                  <Column
                    label={strings.year}
                    cellDataGetter={({ rowData }) => rowData.collectionYear}
                    dataKey='collectionYear'
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  />
                  <Column
                    label={strings.source}
                    cellDataGetter={({ rowData }) => rowData.source}
                    dataKey='source'
                    headerRenderer={headerRenderer}
                    cellRenderer={sourceRenderer}
                    width={columnWidth}
                  />
                </Table>
              )}
            </AutoSizer>
          </div>}
      </div>
    )
  }

  _getDatum (list, index) {
    return list.get(index % list.size)
  }

  _getRowHeight ({ index }) {
    const list = this.props.list
    return this._getDatum(list, index).size
  }

  _noRowsRenderer () {
    return <div className={tableStyles.noRows}>No rows</div>
  }

  // _onScrollToRowChange(event) {
  //   const {rowCount} = this.state;
  //   let scrollToIndex = Math.min(
  //     rowCount - 1,
  //     parseInt(event.target.value, 10),
  //   );
  //
  //   if (isNaN(scrollToIndex)) {
  //     scrollToIndex = undefined;
  //   }
  //
  //   this.setState({scrollToIndex});
  // }

  // https://stackoverflow.com/questions/40412114/how-to-do-proper-column-filtering-with-react-virtualized-advice-needed
  _sort ({ sortBy, event, sortDirection }) {
    if (has(event.target, 'className') && event.target.className.startsWith('Mui')) {
      event.stopPropagation()
    } else {
      this.props.sortResults({ sortBy, sortDirection: sortDirection.toLowerCase() })
    }
  }
}

VirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  search: PropTypes.object.isRequired,
  sortResults: PropTypes.func.isRequired,
  bounceMarker: PropTypes.func.isRequired,
  openMarkerPopup: PropTypes.func.isRequired,
  removeTempMarker: PropTypes.func.isRequired,
  strings: PropTypes.object.isRequired
}

export default withStyles(styles)(VirtualizedTable)
