import React, { Component } from "react";
import Entry from "./entry";
import "./entries.css";

class Entries extends Component {
  constructor() {
    super();
    this.state.counterLen = this.state.counters.length;
  }

  state = {
    counters: [{ id: 1, name: "", value: 0 }],
    counterLen: 0,
    income: 0
  };

  handleAdd = () => {
    const counters = [...this.state.counters];
    const counterLen = this.state.counterLen + 1;
    this.setState({ counterLen: counterLen });
    this.setState({
      counters: counters.concat({
        id: counterLen,
        name: "",
        value: 0
      })
    });
  };

  handleReset = () => {
    let counters = [...this.state.counters];
    counters = [{ id: 1, name: "Food", value: 120 }];
    this.setState({ counters });
  };

  handleDelete = counter => {
    const counters = this.state.counters.filter(c => c.id !== counter.id);
    this.setState({ counters });
  };

  handleChangeForm = (eValue, ePlace, counter) => {
    const counters = [...this.state.counters].map(c => {
      if (ePlace === "Bill") return { ...c, name: eValue };
      else if (ePlace === "Cost") return { ...c, value: parseFloat(eValue) };
      return c;
    });
    this.setState({ counters });
  };

  handleChangeIncome = txtValue => {
    const income = txtValue;
    this.setState({ income });
  };

  render() {
    return (
      <main>
        <div className="form-row auto">
          <div className="col-md-5">
            <button
              type="button"
              onClick={this.handleReset}
              className="btn btn-warning form-control"
              tabIndex="-1"
            >
              Reset
            </button>
          </div>
          <div className="col-md-5">
            <button
              type="button"
              onClick={this.handleAdd}
              className="btn btn-primary form-control"
              tabIndex="-1"
            >
              Add Entry
            </button>
          </div>
        </div>

        <div className="form-row auto">
          <label className="col-md-5 col-form-label">
            <h4>Income per paycheck:</h4>
          </label>
          <div className="col-md-4">
            <input type="email" className="form-control" />
          </div>
          <div className="col-md-3">
            <select className="form-control" defaultValue="Bi-Monthly">
              <option value="Monthly">Monthly</option>
              <option value="Bi-Monthly">Bi-Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>
          </div>
        </div>
        {/* <input
            className="ml-1 mb-2 form-control"
            type="text"
            onBlur={e => this.handleChangeIncome(e.target.value)}
            />
            <select className="ml-1 mb-2 form-control" defaultValue="Bi-Monthly">
            <option value="Monthly">Monthly</option>
            <option value="Bi-Monthly">Bi-Monthly</option>
            <option value="Weekly">Weekly</option>
          </select> */}

        <div className="form-row ">
          <div className="col-md-4">
            <label>Name of Bill</label>
          </div>
          <div className="col-md-2">
            <label>Cost</label>
          </div>
          <div className="col-md-2">
            <label>Frequency</label>
          </div>
          <div className="col-md-2">
            <label htmlFor="">&nbsp;</label>
          </div>
        </div>

        {this.state.counters.map(counter => (
          <Entry
            key={counter.id}
            counter={counter} // encapsulation
            listIndex={this.state.counters.indexOf(counter) + 1}
            onDelete={() => this.handleDelete(counter)}
            onChangeForm={(eValue, ePlace) =>
              this.handleChangeForm(eValue, ePlace, counter)
            }
          />
        ))}

        {/* <h4 className="m-3">Your total: </h4>
        <form className="form-inline">
          <button type="button" className="btn btn-success form-control m-1">
            Calculate
          </button>
        </form> */}
      </main>
    );
  }
}

export default Entries;
