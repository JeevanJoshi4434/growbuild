import React from "react";

const Maintanence = () => {
  return (
    <>
      <div className="container bg-white p-2 rounded-2">
        <form className="row px-4 py-4 mx-2 my-2 justify-content-center shadow-lg">
          <h3 className="text-alternate text-primary">
            Collect Maintainence Payment
          </h3>
          <hr />
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Project</p>
            <div className="input-group">
              <select className="form-control" id="project" name="Project">
                <option>Loading...</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Select Building</p>
            <div className="input-group">
              <select className="form-control" id="building" name="building">
                <option>Loading...</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Floor</p>
            <div className="input-group">
              <select className="form-control" id="floor" name="floor">
                <option>Loading...</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Select Unit</p>
            <div className="input-group">
              <select className="form-control" id="unit" name="unit">
                <option>Select Building</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-2">
            <p className="text-alternate">Fetch Data</p>
            <button type="button" className="btn btn-primary ">
              View Details
            </button>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Owner Name</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="ownerName"
                placeholder="Select Flat first"
                readonly
                name="owner"
                className="form-control"
                value
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <p className="text-alternate">Owner Phone No</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="ownerPhione"
                placeholder="Select Flat first"
                readonly
                name="phone"
                className="form-control"
                value
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Total Maintainence Amount</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="maintainenceAmount"
                placeholder="Select Flat first"
                readonly
                name="maintainenceAmount"
                className="form-control"
                value
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Payment Due</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="due"
                placeholder="Select Flat first"
                readonly
                name="due"
                className="form-control"
                value
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Add Payment</p>
            <div className="input-group">
              <input
                type="text"
                aria-label="addPayment"
                placeholder="Select Flat first"
                readonly
                name="addPayment"
                className="form-control"
                value
              />
            </div>
          </div>
          <div className="col-md-3 col-12 mb-2">
            <p className="text-alternate">Add Payment</p>
            <button type="button" className="btn btn-primary ">
              Add Payment
            </button>
          </div>
        </form>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive bg-white py-4 px-3 my-2 justify-content-center shadow-lg">
              <table
                id="maintanence"
                className="table table-striped table-bordered"
              >
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Total Amount</th>
                    <th>Paid Amount</th>
                    <th>Payment Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>5365</td>
                    <td>435</td>
                    <td>03/03/2024</td>
                    <td>
                      <button type="button" class="btn btn-primary">
                        Print
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maintanence;
