import React, { Component } from 'react';
import Card from './Card'
import axios from 'axios'

class App extends Component {
  state = {
    data: [],
    allMeanings: {}
  }

  showMeaning = (index) => {
    let meanings = []
    let { allMeanings } = this.state;
    let { data } = this.state

    axios.get('https://googledictionaryapi.eu-gb.mybluemix.net/?define=' + data[index] + '&lang=en').then(res => {
        let meaning = res.data[0].meaning;
        for (let key in meaning){
          if(meaning.hasOwnProperty(key)){
            meaning[key].map((def) => {
              meanings.push(def.definition)
            })
          }
        }
        this.setState({allMeanings: {...allMeanings, [index] : meanings}});
    });
  }

  componentDidMount = () => {
    let JSONData = require('./data.json');
    let data = []
    Object.keys(JSONData).forEach(key=>{
      data.push(JSONData[key]);
    });
    this.setState({data: data})
  } 

  render() {
    // console.log(this.state.allMeanings)

    let { data } = this.state;
    let { allMeanings } = this.state;

    let content = data.map((item, index) => {
      if(allMeanings[index]){
        return <Card key={index} item={item} id={index} showMeaning={this.showMeaning.bind(this, index)} meanings={allMeanings[index]} />
      }
      return <Card key={index} item={item} id={index} showMeaning={this.showMeaning.bind(this, index)}/>
    })
    return (
      <div style={{maxWidth: "500px"}} className="mx-auto">
           {content}
      </div>
    );
  }
}

export default App;
