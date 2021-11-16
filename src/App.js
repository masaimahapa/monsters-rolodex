import React, {Component} from 'react';
import './App.css';
import { SearchBox } from './components/search-box/search-box.component';
import { CardList } from './components/card-list/card-list.component';

class App extends Component{
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField:""
    }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then( response => response.json())
    .then(users => this.setState({"monsters": users}))
  }

  //arrow functions have lexical scope. context. when constructor runs, it binds this function
  handleChange = (e) =>{
      //set state is async. so in order to wait for it before we print out
      this.setState({searchField: e.target.value}, () =>
      console.log(this.state)
      )
  }

  render(){
    //destructuring
    const {monsters, searchField} = this.state;
    const fiteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );
    
   return <div className="App">
   <h1>Monster Rolodex</h1>
    <SearchBox 
      placeholder="find monster"
      handleChange={this.handleChange}
    />
      {<CardList monsters={fiteredMonsters}/>}
    </div>
  }
}
export default App;
