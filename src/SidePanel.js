import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

function SidePanel() {
    return (
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
    );
}

export default SidePanel;