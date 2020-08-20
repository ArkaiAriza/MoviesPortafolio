import React from 'react';
import { MenuItem } from '@material-ui/core';

const renderOptions = ({ options, onOptionClick }) => {
  return options.map((item) => {
    return (
      <MenuItem key={item.id} onClick={() => onOptionClick(item.id)}>
        {item.name}
      </MenuItem>
    );
  });
};

class SubMenu extends React.Component {
  render() {
    return <>{renderOptions(this.props)}</>;
  }
}

export default SubMenu;
