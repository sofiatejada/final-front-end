import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CharacterList from '../characters/CharacterList';
import Character from '../characters/Character';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import mock from './mock.json';
import backendMock from './backendMock.json';
import FavesList from '../faves/FavesList';
import FavesDetail from '../faves/FavesDetail';
import CharacterDetail from '../characters/CharacterDetail';

const server = setupServer(
  // eslint-disable-next-line max-len
  rest.get('https://hey-arnold-api.herokuapp.com/api/v1/characters/', 
    (req, res, ctx) => {
      return res(
        ctx.json(mock)
      );
    })
);

const beServer = setupServer(
  // eslint-disable-next-line max-len
  rest.get('https://full-stack-be.herokuapp.com/api/v1/favorites', 
    (req, res, ctx) => {
      return res(
        ctx.json(backendMock)
      );
    })
);

const philServer = setupServer(
  // eslint-disable-next-line max-len
  rest.get('https://hey-arnold-api.herokuapp.com/api/v1/characters/:id', 
    (req, res, ctx) => {
      return res(
        ctx.json({
          "_id": "5da237699734fdcb7bef8f52",
          "name": "Grandpa Phil",
          "image": "https://vignette.wikia.nocookie.net/heyarnold/images/7/79/GrandpaPhil.png/revision/latest/scale-to-width-down/300?cb=20160924030436"
      },)
      );
    })
);

const nancyServer = setupServer(
  // eslint-disable-next-line max-len
  rest.get('https://full-stack-be.herokuapp.com/api/v1/favorites/:id', 
    (req, res, ctx) => {
      return res(
        ctx.json({
          "id": "8",
          "name": "Nancy",
          "image": "https://vignette.wikia.nocookie.net/heyarnold/images/6/62/Nancy.jpg/revision/latest/scale-to-width-down/310?cb=20110423055923"
      },)
      );
    })
);

describe('character component', () => {

  it('displays a character', () => {
    render(
      <Character 
        id="1" 
        name="poop"
        image="example.png" />
    );

    const article = screen.getByRole('img', { name: 'image of poop' });
    expect(article).toMatchSnapshot();
  });
});

describe('character list component', () => {

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('displays a list of characters', async () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );
    
    screen.getByAltText('loading gif');
    const list = await screen.findByLabelText('character-list');
    screen.debug();
    expect(list).toMatchSnapshot();
  });
});

describe('faves list', () => {

  beforeAll(() => beServer.listen());
  afterAll(() => beServer.close());

  it('displays list of faves', async () => {
    render(
      <MemoryRouter>
        <FavesList />
      </MemoryRouter>
    );

    screen.getByAltText('loading gif');
    const list = await screen.findByLabelText('fave-list');
    screen.debug();
    expect(list).toMatchSnapshot();
  });

});

describe('adding phil', () => {

  beforeAll(() => philServer.listen());
  afterAll(() => philServer.close());

  it('adds phil', async () => {
    render(
      <MemoryRouter initialEntries={['/5da237699734fdcb7bef8f52']} >
        <CharacterDetail />
        <FavesList />
      </MemoryRouter>
    );
  
    const phil = await screen.findByAltText('image of Grandpa Phil');
    fireEvent.click(phil);
  
    const addbutt = await screen.findByLabelText('add-butt');
    fireEvent.click(addbutt);
  
    screen.getByAltText('loading gif');
    const favePhil = await screen.findByAltText('fave image of Grandpa Phil')
    waitFor(() => {
      expect(favePhil).not.toBeNull();
    })
  });
});

describe('removing nancy', () => {

  beforeAll(() => nancyServer.listen());
  afterAll(() => nancyServer.close());

  it('removes nancy', async () => {
    render(
      <MemoryRouter initialEntries={['/8']} >
        <FavesDetail />
        <FavesList />
      </MemoryRouter>
    );
  
    const nancy = await screen.findByAltText('fave image of Nancy');
    fireEvent.click(nancy);
  
    const removebutt = await screen.findByLabelText('remove-butt');
    fireEvent.click(removebutt);
  
    screen.getByAltText('loading gif');
    waitFor(() => {
      expect(nancy).toBeNull();
    })
  });
});
