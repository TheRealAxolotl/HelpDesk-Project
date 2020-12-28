/**
 * @name TicketForm
 * @user Component that allows user to submit a new ticket request.
 */

import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default class TicketForm extends Component {
  // Create a constructor that will hold state
  constructor() {
    super();
    this.state = {
      student: '',
      problem: '',
      expectations: '',
      tried: '',
      notWorking: '',
      zoom: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  async onSubmit(e) {
    e.preventDefault();
    const newTicket = {
      student: this.state.student,
      problem: this.state.problem,
      status: 'Open',
      expectations: this.state.expectations,
      tried: this.state.tried,
      notWorking: this.state.notWorking,
      zoom: this.state.zoom,
    };

    try {
      const body = JSON.stringify(newTicket);
      //   const headers = { 'Content-Type': 'application/json' };
      await axios.post('/api/newTicket', body, {
        headers: { 'content-type': 'application/json' },
      });
      await this.setState({
        student: '',
        problem: '',
        expectations: '',
        tried: '',
        notWorking: '',
        zoom: '',
      });
      toast.success('Success: ticket submitted.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="row justify-content-between">
        <div className="col-6">
          <ToastContainer />
          <form
            onSubmit={this.onSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <label>
              STUDENT: 
              <input
              className="form-control"
                onChange={this.onChange}
                type="text"
                name="student"
                value={this.state.student}
              />
       </label>
            <label>
              PROBLEM:
              <textarea className="form-control"
                style={{width: '100%'}}
                onChange={this.onChange}
                type="text"
                name="problem"
                value={this.state.problem}
              />
            </label>
            <label>
              WHAT WE EXPECTED TO HAPPEN:
              <textarea className="form-control"
                style={{width: '100%'}}
                onChange={this.onChange}
                type="text"
                name="expectations"
                value={this.state.expectations}
              />
            </label>
            <label>
              WHAT WE'VE TRIED:
              <textarea className="form-control"
                style={{width: '100%'}}
                onChange={this.onChange}
                type="text"
                name="tried"
                value={this.state.tried}
              />
            </label>
            <label>
              WHY WE EXPECT IT'S NOT WORKING:
              <textarea className="form-control"
                style={{width: '100%'}}
                onChange={this.onChange}
                type="text"
                name="notWorking"
                value={this.state.notWorking}
              />
            </label>
            <label>
              ZOOM ROOM:
              <input className="form-control"
                style={{width: '100%'}}
                onChange={this.onChange}
                type="text"
                name="zoom"
                value={this.state.zoom}
              />
            </label>
            <button className="btn btn-success" type="submit">SUBMIT</button>
          </form>
        </div>
        <div className="col-5 myBorder">

        </div>
      </div>
    );
  }
}
