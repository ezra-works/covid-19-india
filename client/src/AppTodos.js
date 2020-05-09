import React, { useState, Component } from 'react';
// import MyCharts from './components/MyCharts';
import './App.css';
// import MyMaps from './components/MyMaps';
// import Dashboard from './components/Dashboard';
// import Example from './components/Example';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
// import { Container, Row, Col } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import Todos from './components/Todos';

class App extends Component {
  // state = {
  //   id: 'IN-TN',
  // };
  state = {
    todos: [
      {
        id: 1,
        text: 'learning react',
        isComplete: false,
      },
      {
        id: 2,
        text: 'trying react examples',
        isComplete: false,
      },
      {
        id: 3,
        text: 'mastering react',
        isComplete: false,
      },
    ],
  };
  addTodo = (text) => {
    const currentTodos = this.state.todos;
    const newTodo = {
      id: uuid(), //this.state.todos.length + 1,
      text,
      isComplete: false,
    };
    this.setState({ todos: currentTodos.concat(newTodo) });
  };
  markComplete = (index) => {
    const newTodo = this.state.todos.find((todos) => todos.id === index);
    // newTodo.id = 4;
    newTodo.isComplete = true;
    // const newTodo = { id: 4, text: 'Add new todo', isComplete: false };
    // console.log('newTodo ' + JSON.stringify(newTodo) + ',' + index);
    this.setState(newTodo);
  };
  deleteTodo = (index) => {
    console.log(
      'deleteTodo ' +
        JSON.stringify(this.state.todos.filter((todo) => todo.id !== index))
    );
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== index),
    });
  };
  render() {
    return (
      <>
        {this.state.todos.map((todo) => (
          <Todos
            key={todo.id}
            index={todo.id}
            text={todo.text}
            addTodo={this.addTodo}
            markComplete={this.markComplete}
            deleteTodo={this.deleteTodo}
          />
        ))}
      </>
    );
  }
}

export default App;

/*
 {/* <AppNavbar></AppNavbar> }
        {/* <Todos text={this.state.todos.pop().text} /> }
        {/* <MyCharts></MyCharts> }
        {/* <Container>
          <Row>
            <Col xs="6">
              <MyMaps paddingRight={20}></MyMaps>
            </Col>
            <Col>
              <Dashboard stateId={this.state.id}></Dashboard>
            </Col>
          </Row>
        </Container> }
        {/* <Example /> }
*/
