import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import LeafletMap from '../../facet_results/LeafletMap'
import GMap from '../../facet_results/GMap'
import VirtualizedTable from '../../facet_results/VirtualizedTable'
import Pie from '../../facet_results/Pie.js'
import CSVButton from '../../facet_results/CSVButton'
import ResultInfo from '../../facet_results/ResultInfo'

const Places = props => {
  // console.log(props.results)
  return (
    <>
      <PerspectiveTabs routeProps={props.routeProps} strings={props.strings} />
      <Route
        exact path='/app'
        render={() => <Redirect to='/app/table' />}
      />
      <Route
        path='/app/table'
        render={() =>
          <VirtualizedTable
            list={Immutable.List(props.results)}
            resultValues={props.resultValues}
            search={props.search}
            sortResults={props.sortResults}
            updateFacet={props.updateFacet}
            bounceMarker={props.bounceMarker}
            openMarkerPopup={props.openMarkerPopup}
            removeTempMarker={props.removeTempMarker}
            strings={props.strings}
          />}
      />
      <Route
        path='/app/map_clusters'
        render={() =>
          <LeafletMap
            results={props.results}
            mapMode='cluster'
            geoJSON={props.map.geoJSON}
            geoJSONKey={props.map.geoJSONKey}
            getGeoJSON={props.getGeoJSON}
            bouncingMarker={props.map.bouncingMarker}
            popupMarker={props.map.popupMarker}
            bouncingMarkerKey={props.map.bouncingMarkerKey}
            openPopupMarkerKey={props.map.openPopupMarkerKey}
            strings={props.strings}
            reduceHeight={72}
            mapElementId='resultMap'
          />}
      />
      <Route
        path='/app/map_markers'
        render={() => {
          if (props.results.length > 5000) {
            return <ResultInfo message={props.strings.tooManyResults} />
          } else {
            return (
              <LeafletMap
                results={props.results}
                mapMode='noCluster'
                geoJSON={props.map.geoJSON}
                geoJSONKey={props.map.geoJSONKey}
                getGeoJSON={props.getGeoJSON}
                bouncingMarker={props.map.bouncingMarker}
                popupMarker={props.map.popupMarker}
                bouncingMarkerKey={props.map.bouncingMarkerKey}
                openPopupMarkerKey={props.map.openPopupMarkerKey}
                strings={props.strings}
                reduceHeight={72}
                mapElementId='resultMap'
              />
            )
          }
        }}
      />
      <Route
        path='/app/heatmap'
        render={() =>
          <GMap
            results={props.results}
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCKWw5FjhwLsfp_l2gjVAifPkT3cxGXhA4&v=3.exp&libraries=geometry,drawing,places,visualization'
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: 'calc(100% - 72px' }} />}
            mapElement={<div style={{ height: '100%' }} />}
            strings={props.strings}
          />}
      />
      <Route
        path='/app/statistics'
        render={() =>
          <Pie
            data={props.results}
            groupBy={props.search.groupBy}
            groupByLabel={props.search.groupByLabel}
            query={props.search.query}
            strings={props.strings}
          />}
      />
      <Route
        path='/app/download'
        render={() =>
          <CSVButton results={props.results} strings={props.strings} />}
      />
    </>
  )
}

Places.propTypes = {
  options: PropTypes.object.isRequired,
  clientSideFacetedSearch: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  results: PropTypes.array,
  resultValues: PropTypes.object,
  updateQuery: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  sortResults: PropTypes.func.isRequired,
  getGeoJSON: PropTypes.func.isRequired,
  bounceMarker: PropTypes.func.isRequired,
  openMarkerPopup: PropTypes.func.isRequired,
  removeTempMarker: PropTypes.func.isRequired,
  updateResultFormat: PropTypes.func.isRequired,
  updateMapMode: PropTypes.func.isRequired,
  updateFacet: PropTypes.func.isRequired,
  routeProps: PropTypes.object.isRequired
}

export default Places
