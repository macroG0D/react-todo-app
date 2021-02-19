import React, { Component } from 'react';

import './app.css';

import listData from '../../static/listData';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import AppHeader from '../app-header';
import ItemAddFrom from '../item-add-form';

export default class App extends Component {
  state = {
    listData: listData,
    term: '',
    filterTerm: 'all', // isActive / isDone
  };

  deleteItem = (id) => {
    this.setState(({ listData, toDo, done }) => {
      const index = listData.findIndex((el) => el.id === id);
      const newListData = [
        ...listData.slice(0, index),
        ...listData.slice(index + 1),
      ];
      return {
        listData: newListData,
      };
    });
  };

  addItem = (text) => {
    if (!text) {
      return;
    }
    const newItem = this.gerenateNewObject(text);
    this.setState(({ listData }) => {
      const newListData = [...listData, newItem];
      return {
        listData: newListData,
      };
    });
  };

  generateUniqueId = () => {
    const { listData } = this.state;
    let unique = 1;
    if (listData.length > 0) {
      unique = listData[listData.length - 1].id + 1;
    }
    return unique;
  };

  gerenateNewObject = (text) => {
    return {
      id: this.generateUniqueId(),
      label: text,
      isImportant: false,
      isDone: false,
    };
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  onToggleImportant = (id) => {
    this.setState(({ listData }) => {
      return {
        listData: this.toggleProperty(listData, id, 'isImportant'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ listData }) => {
      return {
        listData: this.toggleProperty(listData, id, 'isDone'),
      };
    });
  };

  updateStats = () => {
    this.setState(({ listData }) => {
      return {
        toDo: listData.length,
      };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  search = (arr) => {
    const { term } = this.state;
    if (term.length === 0) {
      return arr;
    }
    return arr.filter(
      (el) => el.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  onFilterChange = (filterTerm) => {
    this.setState({ filterTerm });
  };

  filterItems = (arr) => {
    const { filterTerm } = this.state;
    switch (filterTerm) {
      case 'all':
        return arr;
      case 'isActive':
        return arr.filter((el) => !el.isDone);
      case 'isDone':
        return arr.filter((el) => el.isDone);
      default:
        return arr;
    }
  };

  render() {
    const { listData } = this.state;
    const visibleItems = this.filterItems(this.search(listData));
    const doneCount = listData.filter((el) => el.isDone).length;
    const toDo = listData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={toDo} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            activeButton={this.state.filterTerm}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddFrom addItem={this.addItem} />
      </div>
    );
  }
}
