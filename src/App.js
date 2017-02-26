import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Algebrite from 'algebrite';
import _ from 'lodash';

import OutputRow from './OutputRow';

class App extends Component {
  constructor(props) {
    super(props);
    this.currentId = 0;
    this.state = {
      sidePanelOpen: false,
      input: '',
      output: []
    };
  }

  handleToggle = () => this.setState({sidePanelOpen: !this.state.open});

  handleClose = () => this.setState({sidePanelOpen: false});

  handleChange = (e) => this.setState({input: e.target.value});

  handleInput = (event) => {
    this.setState({input: event.target.value});
    if (event.key === 'Enter') {
      let output = _.cloneDeep(this.state.output);
      let result = Algebrite.run(`${event.target.value}`);
      let resultLatex = Algebrite.run(`printlatex(${event.target.value})`);
      let key = this.currentId++;
      let deleteRow = () => {
        let cleanedOutput = _.cloneDeep(this.state.output);
        let index = _.findIndex(cleanedOutput, row => row.key === '' + key);
        if (index >= 0) cleanedOutput.splice(index, 1);
        this.setState({output: cleanedOutput});
      }
      output.push(
        <OutputRow 
          key={key}
          input={this.state.input}
          output={result} 
          outputLatex={resultLatex} 
          onRowDelete={deleteRow}/>
      );
      this.setState({output, input: ''});
    }
  }

  render() {
    return (
      <div>
        <AppBar
          style={{position: 'fixed', top: '0px'}}
          title="MathTerm"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <div style={{height: '4em'}} />
        {this.state.output}
        <Paper zDepth={1} style={{padding: '1em'}}>
          <TextField
            value={this.state.input}
            onChange={this.handleChange}
            fullWidth={true}
            onKeyPress={this.handleInput}
            hintText="Do some math . . ."
          />
        </Paper>
        <Drawer
          docked={false}
          open={this.state.sidePanelOpen}
          onRequestChange={(open) => this.setState({sidePanelOpen: open})}
        >
        <Paper style={{padding: '1em', margin: '1em'}}>
          <p>Powered by Algebrite and MathJax!</p>
          <p>Written by Gabe Pearhill</p>
        </Paper>
        </Drawer>
      </div>
    );
  }
}

export default App;
