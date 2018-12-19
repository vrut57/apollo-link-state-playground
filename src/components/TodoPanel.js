import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

// import styled from "styled-components";

// const Div = styled.div`
//   margin: 40px;
//   border: 5px outset pink;
//   &:hover {
//     background-color: yellow;
//   }
// `;

const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
    localState @client {
      label
      value
    }
  }
`;

const TodoList = () => (
  <Query query={GET_TODOS}>
    {({ data: { todos, visibilityFilter, localState } }) => {
      return (
        <div>
          {localState.map(ele => (
            <div>
              <div>Label: {ele.label}</div>
              <div>Value: {ele.value}</div>
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default TodoList;
