import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
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
        <div style={{padding: '1em'}}>
          <div style={{textAlign: 'center'}}>
            <Avatar src="MathTermLogo.png" size={100} backgroundColor={'rgba(1,1,1,0)'} style={{borderRadius: '20%'}}/>
            <h3>MathTerm.io</h3>
            <p>Written by Gabe Pearhill</p>
            <a className="github-button" href="https://github.com/pearman/mathterm.io" data-icon="octicon-star" data-style="mega" data-count-href="/pearman/mathterm.io/stargazers" data-count-api="/repos/pearman/mathterm.io#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star pearman/mathterm.io on GitHub">Star</a>
            <br />
            <a className="github-button" href="https://github.com/pearman/mathterm.io/issues" data-icon="octicon-issue-opened" data-style="mega" data-count-api="/repos/pearman/mathterm.io#open_issues_count" data-count-aria-label="# issues on GitHub" aria-label="Issue pearman/mathterm.io on GitHub">Issue</a>
          </div>
          <br />
          <Divider />
          <br />
          <div style={{textAlign: 'center'}}>
            <p>Powered by the following Open Source technologies:</p>
            <Avatar src="algebriteLogo.png" size={100} backgroundColor={'rgba(1,1,1,0)'} style={{borderRadius: '0%'}}/>
            <Avatar src="MathJaxLogo.png" size={100} backgroundColor={'rgba(1,1,1,0)'} style={{borderRadius: '0%'}}/>
          </div>
        </div>
        </Drawer>
      </div>
    );
  }
}

export default App;
