import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getDetails } from '../store/actions/WorkorderlistAction'
import axios from 'axios';
import Popup from '../Comman/Popup';


class Workorderdetails extends Component {

  state = {
    won: {},
    isOpen: false,
    ispageStatus: false
  }

  componentDidMount() {

    let wonId = this.props.match.params.won
    axios.get('https://cors-anywhere.herokuapp.com/http://dev.northsight.io/api/work_order' + "/" + wonId, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "X-USER-ID": "00903200-EQ00-QUY1-UAA3-1EQUY1EQ1EQU",
        "X-APP-ID": "4010f312-fd81-4049-a482-9f2f4af24947"
      }
    }).then(res => {
      console.log('success-->', res)
      let obj = res.data
      this.setState(prevState => ({
        ...prevState,
        won: obj
      }))
    }
    )
  }

  togglePopup = (isOpen) => {
    this.setState(!isOpen);
  }

  render() {
    const { isOpen, ispageStatus } = this.state
    const { won } = this.props.won
    const { instructions_full } = won
    console.log("instructions", instructions_full);
    return (

      <div style={{ backgroundColor: "#EEF0F2", height: 877 }}>
        {/* { ispageStatus && } */}
        <div style={{ height: 70, width: 414, marginTop: -59, backgroundColor: "#47A5CE", marginLeft: -39 }}>
          <div style={{ marginLeft: 77, paddingTop: "27px", color: "white" }}>
            <h6 style={{ marginTop: -3, marginLeft: 64 }}>Work Order Detail</h6>
          </div>
        </div>
        {/* <div style={{ marginLeft: 30, marginTop: 30 }}>
          <h6 style={{ fontSize: 15, marginLeft: 45 }}>WO #{this.state.won.won} Service Call</h6>
        </div> */}
        <div style={{ backgroundColor: "#FEFEFE", borderRadius: "13px", height: 180, marginTop: 34, width: 367, flexDirection: "row", paddingTop: 26, marginLeft: 4 }}>
          <div style={{ height: "1px", paddingLeft: 17 }}>
            <img src={this.state.won.image_url_small} width="120" height="80" style={{
              width: 115,
              height: 117,
              borderRadius: 27,
              overflow: "hidden",
              borderWidth: 3,
              borderColor: "red"
            }} />
          </div>
          <div>
            <div style={{ marginTop: 10 }}>
              <h5 className="card-body" style={{ color: "#64B9E6", paddingLeft: 196, fontSize: 16, marginTop: -14 }}>WOrk Order<br />#
                            {this.state.won.won}</h5>
              <h5 className="card-body" style={{ color: "#777777", paddingLeft: 196, fontSize: 14 }}>{this.state.won.address_city}</h5>
              {/* </Link> */}
              <h5 className="card-title" style={{ color: "#777777", paddingLeft: 196, fontSize: 14 }}>{this.state.won.address_state}</h5>
            </div>

          </div><br />

          <h5 className="card-title" style={{ color: "#777777", paddingLeft: 196, fontSize: 11 }}>Scheduled Date : <br />{this.state.won.created_date}<br />(On Time)</h5>
        </div>
        <div>
          <div style={{ marginTop: 10, marginLeft: 89, fontSize: 17 }}>
            Work Order Instructions
                   </div>
          <div style={{ backgroundColor: "#FEFEFE", borderRadius: "13px", height: 113, marginTop: 10, width: 363, flexDirection: "row", paddingTop: 10, marginLeft: 5, fontSize: 11, paddingLeft: 8, color: "#777777" }}>
            {this.state.won.instructions_full ? this.state.won.instructions_full[0].instruction : null}
          </div>
        </div>
        {/* <div style={{ border: "2px solid #64B9E6", marginTop: 30, marginLeft: 10, width: 350 ,flexDirection:"row",borderRadius: "7px",fontSize:"15px"}}>
        <div style={{height: "1px", paddingLeft: 10}}>
          {this.state.won.last_status_update?this.state.won.last_status_update.expected_upload_date:null}
        </div>
        <div style={{paddingLeft:193}}>
        {this.state.won.last_status_update?this.state.won.last_status_update.explanation:null}

        </div>
       
        </div> */}
        {/* <div>
         <div style={{ border: "2px solid #64B9E6", marginTop: 30, marginLeft: 10, width: 350 ,flexDirection:"row",borderRadius: "7px",fontSize:"15px"}}>
        <div style={{height: "1px", paddingLeft: 10}}>
        <h5 style={{ fontSize: 14 }}>ECD : 2020-12-14</h5>
        </div>
        <div style={{paddingLeft:193}}>
        <h5 style={{ fontSize: 14 }}>My equipment is not waterproof.  I have to wait until it is dry.</h5>

        </div><br />
       
        </div>
        <input
            type="button"
            style={{ marginLeft: 120, margin:124,height: 30, border: "2px solid #64B9E6", borderRadius: "7px", color: "black" }}
            value="New Status Update"
            // onClick={togglePopup}
        />
        {isOpen && <Popup
            content={<>
                <h5 style={{ fontSize: 14 }}>New Status Update</h5><br />
                <h5 style={{ fontSize: 14 }}>My equipment is not waterproof.  I have to wait until it is dry.</h5> <br />
                <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2020-11-15" /><br />

                <input type="text" style={{ marginTop: 30 ,height:30}} class="form-control" placeholder="Enter Status Updates notes" /> <br />
             
                <button style={{ marginTop: 30, height: 30, border: "2px solid #64B9E6", borderRadius: "7px", color: "black" }} >Save Status Update</button>
              
            </>}
            // handleClose={togglePopup}
        />}
    </div> */}

      </div>
    );
  }
}


const mapStateToProps = (state) => ({ won: state.won })

export default connect(mapStateToProps, { getDetails })(Workorderdetails)