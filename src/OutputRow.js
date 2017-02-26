import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import IconButton from 'material-ui/IconButton';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';

import MathJax from 'react-mathjax';

class OutputRow extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      menuOpen: false,
      latexMode: true
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      menuOpen: false,
    });
  };

  toggleLatexMode = () => {
    this.setState({
      latexMode: !this.state.latexMode
    });
  }

  render() {
    return (
      <Paper style={{margin: '1em', padding: '1em'}}>
        <table style={{width: '100%'}}>
          <tbody>
            <tr>
              <td style={{textAlign: 'center', width: '100%'}}>
                <p style={{whiteSpace: 'nowrap', color: 'rgba(0,0,0,0.25)'}}>{this.props.input}</p>
                {
                  this.state.latexMode ?
                    <MathJax.Context>
                      <MathJax.Node>
                        {this.props.outputLatex}
                      </MathJax.Node>
                    </MathJax.Context>
                  : <p style={{whiteSpace: 'nowrap'}}>{this.props.output}</p>
                }
              </td>
              <td>
                <IconButton
                  onTouchTap={this.handleTouchTap}
                >
                  <NavigationMoreVert />
                </IconButton>   
                <Popover
                  open={this.state.menuOpen}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleRequestClose}
                >
                  <Menu>
                    <MenuItem primaryText="Toggle Typesetting" onTouchTap={this.toggleLatexMode} />
                    <MenuItem primaryText="Delete Row" onTouchTap={this.props.onRowDelete} />
                  </Menu>
                </Popover>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    );
  }
}

export default OutputRow;
