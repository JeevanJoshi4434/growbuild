import React from "react";
import numberToWords from "number-to-words";
import userImg from "../../../layouts/components/utils/logo.jpeg";
import bgImage from "../../../assets/img/backgrounds/Letterhead-bg.png";
import printCss from "./print.css";
const InstallmentPDF = (props) => {
  const { data, project, building } = props;
  const date = new Date(data?.list[data?.list.length - 1].onDate);
  const amount = data?.list[data?.list.length - 1].price?.toFixed(0);
  const convertToIndianCount = (number) => {
    const oneToNineteen = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertChunk = (num) => {
      if (num === 0) {
        return "";
      } else if (num < 20) {
        return oneToNineteen[num] + " ";
      } else {
        const digitOne = num % 10;
        const digitTen = Math.floor(num / 10);
        return (
          tens[digitTen] +
          (digitOne !== 0 ? ` ${oneToNineteen[digitOne]}` : "") +
          " "
        );
      }
    };

    const convertNumber = (num) => {
      if (num === 0) {
        return "Zero";
      }

      const crore = Math.floor(num / 10000000);
      const lakh = Math.floor((num % 10000000) / 100000);
      const thousand = Math.floor((num % 100000) / 1000);
      const hundred = Math.floor((num % 1000) / 100);
      const remainingTens = num % 100;

      let result = "";

      if (crore > 0) {
        result += `${convertChunk(crore)}Crore `;
      }
      if (lakh > 0) {
        result += `${convertChunk(lakh)}Lac `;
      }
      if (thousand > 0) {
        result += `${convertChunk(thousand)}Thousand `;
      }
      if (hundred > 0) {
        result += `${oneToNineteen[hundred]} Hundred `;
      }
      if (remainingTens > 0) {
        result += convertChunk(remainingTens);
      }

      return result.trim();
    };

    return `Rupees ${convertNumber(number)}`;
  };
  const handlePrint = () => {
    const printableArea = document.getElementById("printableData");

    if (printableArea) {
      const title = `${
        data?.name
      }_InstallmentNotice_${new Date().toLocaleDateString()}`;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`<html><head><title>${title}</title>`);

      // Include styles from the main document
      const styles = document.head.getElementsByTagName("style");
      for (let style of styles) {
        printWindow.document.write(style.outerHTML);
      }

      // Include external stylesheets
      const links = document.head.getElementsByTagName("link");
      for (let link of links) {
        if (link.rel === "stylesheet") {
          printWindow.document.write(link.outerHTML);
        }
      }

      printWindow.document.write("</head><body>");
      printWindow.document.write(printableArea.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="btn btn-danger btn-md my-3 float-end"
      >
        Print Now
      </button>
      <hr />
      <div id="printableData" className="my-3">
        <div className="container mt-5 letterhead-bg">
          {/* <div className="bg-primary text-white p-3 text-center">
                        <h3>Demand Notice</h3>
                    </div> */}

          <div className="mt-3">
            {/* <img src={userImg} alt="logo" className="my-logo" /> */}
            <p>Date: {date.toLocaleDateString()}</p>
            {/* <p>Client Number: {data?.Application_Number}</p> */}
            <p>To:</p>
            <p>
              {data?.name}{" "}
              {data?.secondP?.replace(" ", "") !== ""
                ? `  ${
                    data?.secondP !== null && data?.secondP !== undefined
                      ? `& ${data?.secondP}`
                      : ""
                  }`
                : ""}
              , Purchaser
            </p>
            <p>Address: {data?.currentAddress}</p>

            <p>Dear Sir/Madam,</p>

            <p>
              Sub: Demand notice for payment against Agreement for Sale of Flat
              No: {data?.floor} in Block No: {data?.unit} at {building}{" "}
              {project}.
            </p>

            <p>
              This is for your kind information that your payment against the
              agreement for sale is due now. As per the payment schedule, you
              are requested to pay the total sum of Rs. {amount}/- (
              {convertToIndianCount(amount)}) only within the due date.
            </p>

            <table className="table table-bordered table-hover my-4 p-5">
              <thead>
                <tr>
                  <th>Payment Stage</th>
                  <th>Installment amount</th>
                  <th>Stage Rate</th>
                  <th>Date</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.list.map((i) => {
                  let date = new Date(i.onDate);
                  return (
                    <tr>
                      <td>{i.demandName}</td>
                      <td>
                        {(i.bookingPending * (i.demandAmount / 100))?.toFixed(
                          2
                        )}
                      </td>
                      <td>{i.demandAmount}%</td>
                      <td>{date.toLocaleDateString()}</td>
                      <td>{i.price?.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p>Please make the Cheque in favor of J.G. Development Pvt. Ltd.</p>

            <p>RTGS Information:</p>
            <ul>
              <li>
                <h6>
                  A/c:<strong> J.G. Development Pvt. Ltd</strong>
                </h6>
              </li>
              <li>
                <h6>
                  Bank Name:<strong> State Bank of India, Dover Place</strong>
                </h6>
              </li>
              <li>
                <h6>
                  Escrow Account number:<strong> 38729699464</strong>
                </h6>
              </li>
              <li>
                <h6>
                  IFSC:<strong> SBIN0040229</strong>
                </h6>
              </li>
            </ul>
            <div className="mt-3">
              <p>Thanking you.</p>

              <p>Yours Faithfully,</p>

              <p>For JG Development Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentPDF;
