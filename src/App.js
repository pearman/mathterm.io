import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ActionHelp from 'material-ui/svg-icons/action/help';

import Algebrite from 'algebrite';
import _ from 'lodash';

import OutputRow from './OutputRow';
import Help from './Help';
import SidePanel from './SidePanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.currentId = 0;
    this.state = {
      sidePanelOpen: false,
      helpOpen: false,
      input: '',
      output: []
    };
  }

  handleSidePanelToggle = () => this.setState({sidePanelOpen: !this.state.sidePanelOpen});

  handleHelpOpen = () => this.setState({helpOpen: true});

  handleHelpClose = () => this.setState({helpOpen: false});

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
          onLeftIconButtonTouchTap={this.handleSidePanelToggle}
          iconElementRight={<IconButton><ActionHelp /></IconButton>}
          onRightIconButtonTouchTap={this.handleHelpOpen}
        />
        <div style={{height: '4em'}} />
        {this.state.output.length > 0 ? 
          this.state.output
          : <div>
              <p style={{color: 'rgba(0,0,0,0.3)', textAlign: 'center'}}>
                Try typing <b>(x+5)(x+4)</b> or <b>factor(x^2 + 9x + 20)</b>
              </p>
              <p style={{color: 'rgba(0,0,0,0.3)', textAlign: 'center'}}>
                Maybe some calculus: <b>integral(x^5)</b> ?
              </p>
            </div>
          }
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
          <SidePanel />
        </Drawer>
        <Dialog
          title="Help"
          modal={false}
          open={this.state.helpOpen}
          onRequestClose={this.handleHelpClose}
        >
          <Help />
        </Dialog>
      </div>
    );
  }
}

export default App;
