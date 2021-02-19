import React, { Component } from 'react';
import './item-add-form.css';

export default class ItemAddFrom extends Component {
  state = {
    newItemText: '',
  };

  labelChange = (e) => {
    this.setState({
      newItemText: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { newItemText } = this.state;
    this.props.addItem(newItemText);
    this.setState({
      newItemText: '',
    });
  }

  render() {
    return (
      <form
      className="item-add-form d-flex"
      onSubmit={this.onSubmit}
      >
        <input
          type="text"
          className="form-control new-item-field"
          placeholder="What needs to be done"
          onChange={this.labelChange}
          value={this.state.newItemText}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add item
        </button>
      </form>
    );
  }
}
