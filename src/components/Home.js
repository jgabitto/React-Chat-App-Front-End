import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
    width: 70%;
    margin-top: 8rem;

    .message {
        color: red;
    }

`;

const StyledImg = styled.img`
    width: 40px;
`;

const ACTIONS = {
  SET_LOCATION: 'location',
  SET_WEATHER: 'weather',
  SET_ERROR: 'error'
}

const INITIAL_STATE = {
  location: '',
  weather: null,
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOCATION:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_WEATHER:
      return { ...state, [action.payload.field]: action.payload.value }
    case ACTIONS.SET_ERROR:
      return { ...state, [action.payload.field]: action.payload.value }
  }
}

const Home = ({ }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { location, weather, error } = state;

  // useEffect(() => {

  // }, [])

  const onSubmit = async (event) => {
    event.preventDefault()


  }

  const onChange = (e) => {
    dispatch({ type: e.target.name, payload: { field: e.target.name, value: e.target.value } })
  }

  return (
    <StyledWrap className="container text-center">
      <div>
        Hello
        </div>
    </StyledWrap>
  )
};

// {/* <div className="">
// <h1 className="display-4">City Weather</h1>
// <p className="lead">This is a simple weather app. Enter the name of the city and will get all the information about the city's weather</p>
// {/* <hr className="my-4" /> */}
// <div className="input-group mb-3 justify-content-center container">
// <form onSubmit={onSubmit}>
//     <input className="form-control mb-2" name="location" value={location} onChange={onChange} placeholder="City Name or Zipcode" required />
//     {error ? <div className="message pb-2">{error}</div> : null}
//     <div className="input-group-append">
//         <button className="btn btn-outline-info" type="submit">Search</button>
//     </div>
// </form>
// </div>
// </div> */}


export default Home;