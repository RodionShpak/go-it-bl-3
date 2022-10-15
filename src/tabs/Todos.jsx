import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todo: [],

  }
  addTodo = (text) => {
    const todo = {
      id: nanoid(), text
    }
    this.setState(prevState => ({todo: [...prevState.todo, todo]}))
  }
  hengleGetQuery = (value) => {
    this.addTodo(value)
  }
  render() {
    return <SearchForm onSubmit={this.hengleGetQuery} />;
  }
}
