import React, { Component } from 'react';

class Card extends Component {
  state = {
    showLink: true,
    style: {}
  }

  showMeaningCall = () => {
    this.props.showMeaning();
    this.setState({showLink: false})
  }

  changeBack = () => {
    this.setState({style: { backgroundColor: "#fffdd0" }})
  }

    render() {
      let { meanings } = this.props;
      let content;
      let {showLink, style} = this.state;

      if(meanings){
        content = meanings.map((item, index) => {
          return <li key={index}>{item}</li>
        })
      }
      return <div onClick={this.changeBack} className="card mt-2" style={style}>
      <div className="card-body">
        <h3 className="card-title"><strong>{this.props.item}</strong></h3>  
        {meanings? <ul className="card-body">
          {content}
        </ul> : null}
        {showLink? <button onClick={this.showMeaningCall} className="btn btn-link" href="">Show meaning &rarr;</button>: null}
      </div>
    </div>;
    }
  }

  export default Card;