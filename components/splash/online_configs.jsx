import React from 'react';

export default class OnlineConfig extends React.Component {
  constructor (props) {
    super(props);
  }

  showConfigs () {
    // this.props.configs.map(config => {
    //   return (
    //     <p>{config}</p>
    //   );
    // });
  }

  render () {
    return (
      <div className={this.props.configsContainerClass}>

      </div>
    );
  }
}
