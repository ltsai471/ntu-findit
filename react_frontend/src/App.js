import React, { Component } from "react";
import './styles.css';

const orderItems = [
  {
    "id": "001",
    "customer": "Steve"
  },
  {
    "id": "017",
    "customer": "Steve"
  },
  {
    "id": "021",
    "customer": "Steve"
  },
  {
    "id": "101",
    "customer": "Steve"
  }
];

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       todoList: todoItems,
//     };
//   }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input></input>
          <button>search</button>
        </div>
        <div class="grid-container">
          <div class="grid-header">Orders</div>
          <div class="grid-col-header1">ID</div>
          <div class="grid-col-header2">Customer</div>
          <div class="grid-item">1</div>
          <div class="grid-item">2</div>
          <div class="grid-footer">Footer</div>
        </div>
      </header>
    </div>
  );
}

export default App;
