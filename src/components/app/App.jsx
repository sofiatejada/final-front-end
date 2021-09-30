import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CharacterList from '../characters/CharacterList';
import CharacterDetail from '../characters/CharacterDetail';
import FavesList from '../faves/FavesList';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={CharacterList} />
          <Route exact path="/character/:id" component={CharacterDetail} />
          <Route exact path="/personal/faves" component={FavesList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
