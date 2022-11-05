import { useRouter } from "next/router";
import React from "react";

const InvoiceDetails = () => {
  const router = useRouter();

  const goBack = () => router.push("/");

  return (
    <div className="main__container">
      <div className="back__btn">
        <h6 onClick={goBack}> Go Back</h6>
      </div>

      {/* ======= invoice details header ========== */}
      <div className="invoice__details-header">
        <div className="details__status">
          <p>Status</p>

          <button className="pending__status">data</button>
        </div>

        <div className="details__btns">
          <button
            className="edit__btn"
            onClick={() => router.push(`/edit/123`)}
          >
            Edit
          </button>

          {/* ========= confirm deletion modal start ========== */}

          {/* ======== confirm deletion modal end */}

          <button className="delete__btn">
            Delete
          </button>

          <button
            className="mark__as-btn"
          >
            Mark as Paid
          </button>
        </div>
      </div>

      {/* ========= invoice details =========== */}

      <div className="invoice__details">
        <div className="details__box">
          <div>
            <h4>data.id</h4>
            <p>data.description</p>
          </div>
          <div>
            <p>data.senderAddress.street</p>
            <p>data.senderAddress.city</p>
            <p>data.senderAddress.postalCode</p>
            <p>data.senderAddress.country</p>
          </div>
        </div>

        {/* =========== details box 2 =========== */}
        <div className="details__box">
          <div>
            <div className="invoice__created-date">
              <p>Invoice Date</p>
              <h4>data.createdAt</h4>
            </div>
            <div>
              <p className="invoice__payment">Payment Due</p>
              <h4>data.paymentDue</h4>
            </div>
          </div>

          {/* ======= invoice client address ========== */}
          <div className="invoice__client-address">
            <p>Bill to</p>
            <h4>data.clientName</h4>
            <div>
              <p>data.clientAddress.street</p>
              <p>data.clientAddress.city</p>
              <p>data.clientAddress.postalCode</p>
              <p>data.clientAddress.country</p>
            </div>
          </div>

          <div>
            <p>Send to</p>
            <h4>data.clientEmail</h4>
          </div>
        </div>

        {/* ========= invoice items ============= */}
        <div className="invoice__item-box">
          <ul className="list">
            <li className="list__item">
              <p className="item__name-box">Item Name</p>
              <p className="list__item-box">Qty</p>
              <p className="list__item-box">Price</p>
              <p className="list__item-box">Total</p>
            </li>

            {/* ======== invoice item ======= */}

          
              <li className="list__item" key={123}>
                <div className="item__name-box">
                  <h5>item.name</h5>
                </div>

                <div className="list__item-box">
                  <p>item.quantity</p>
                </div>
                <div className="list__item-box">
                  <p>$item.price</p>
                </div>
                <div className="list__item-box">
                  <h5>$item.total</h5>
                </div>
              </li>
            
          </ul>
        </div>

        {/* ========== grand total ============= */}
        <div className="grand__total">
          <h5>Grand Total</h5>
          <h2>data.total</h2>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
