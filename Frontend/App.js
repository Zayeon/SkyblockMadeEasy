import React from 'react'
import { Route, Switch } from 'react-router-dom';

import SearchPage from './SearchPage.js'
import DesignedStatsViewer from './DesignedStatsViewer.js'

class App extends React.Component {

  render() {
    return (
      <Switch>
          <Route path="/" component={SearchPage} exact />
          <Route path="/player/:playerName" component={DesignedStatsViewer} />
      </Switch>
    )
  }

}


export default App;
