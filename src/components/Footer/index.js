import React from "react";
import './index.scss';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Footer', name: 'test' };
    // this.updateFooterText = this.updateFooterText.bind(this);
  }
  updateFooterText() {
    this.setState({ text: 'UpdateFooter' })
    // state: 原始資料 props: 更新時的props
    // this.setState((state, props) => (
    //   { name: state.text }
    // ));
  }
  render() {
    return(
      <footer className='footer-box' onClick={() => this.updateFooterText()}>
        {this.state.text}<br />
        {this.state.name}
      </footer>
    );
  }
}
export default Footer;