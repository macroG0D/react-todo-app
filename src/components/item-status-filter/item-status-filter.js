import { React, Component } from 'react';

export default class ItemStatusFilter extends Component {

  buttons = [
    { value: 'all', label: 'All' },
    { value: 'isActive', label: 'Active' },
    { value: 'isDone', label: 'Done' },
  ];

  render() {
    const { activeButton, onFilterChange } = this.props;
    const allButtons = this.buttons.map((button) => {
      const { value } = button;
      const active = activeButton === value;
      const clazz = active ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={value}
          onClick={() => onFilterChange(value)}
        >
          {button.label}
        </button>
      );
    });
    return <div className="btn-group">{allButtons}</div>;
  }
}
