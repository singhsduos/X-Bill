import React, { useRef } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import { toast } from "react-toastify";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const InvoiceDetails = (props) => {
  const router = useRouter();
  const { data } = props;
  const modalRef = useRef(null);

  const goBack = () => router.push("/");

  // update invoice status in database
  const updateStatus = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "PUT",
      });
      await res.json();
      toast.success("Status updated");
      router.reload(window.location.pathname);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // delete invoice from the database
  const deleteInvoice = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // open modal
  const modalToggle = () => modalRef.current.classList.toggle("showModal");

  //download pdf invoice
  const container = React.useRef(null);
  const downloadPdf = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Invoice for #${data.id
        .substr(0, 6)
        .toUpperCase()}-${new Date().getTime()}`,
    });
  };

  return (
    <div className="main__container">
      <div className="back__btn">
        <h6 onClick={goBack}> Go Back</h6>
      </div>

      {/* ======= invoice details header ========== */}
      <div className="invoice__details-header">
        <div className="details__status">
          <p>Status</p>

          <button
            className={`${
              data.status === "paid"
                ? "paid__status"
                : data.status === "pending"
                ? "pending__status"
                : "draft__status"
            }`}
          >
            {data.status}
          </button>
        </div>

        <div className="details__btns">
          <button
            className={`${data.status === "paid" ? "disable" : ""} edit__btn`}
            onClick={() => router.push(`/edit/${data.id}`)}
          >
            Edit
          </button>

          {/* ========= confirm deletion modal start ========== */}
          <div className="delete__modal" ref={modalRef}>
            <div className="modal">
              <h3>Confirm Deletion</h3>
              <p>
                Are you sure you want to delete invoice #
                {data.id.substr(0, 6).toUpperCase()}? This action cannot be
                undone.
              </p>

              <div className="details__btns modal__btns">
                <button className="edit__btn" onClick={modalToggle}>
                  Cancel
                </button>

                <button
                  className="delete__btn"
                  onClick={() => deleteInvoice(data.id)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          {/* ======== confirm deletion modal end */}

          <button className="delete__btn" onClick={modalToggle}>
            Delete
          </button>

          <button
            className={`${
              data.status === "draft" || data.status === "pending"
                ? "disable"
                : ""
            } download__btn`}
            onClick={downloadPdf}
          >
            Download
          </button>

          <button
            onClick={() => updateStatus(data.id)}
            className={`${
              data.status === "paid" || data.status === "draft" ? "disable" : ""
            }  mark__as-btn`}
          >
            Mark as Paid
          </button>
        </div>
      </div>

      {/* ========= invoice details =========== */}
      <PDFExport>
        <div className="invoice__details" ref={container}>
          <div className="details__box">
            <div>
              <h4>
                Invoice No: #{data.id.substr(0, 6).toUpperCase()}
                {data.id.substr(22, 24).toUpperCase()}
              </h4>
              <p>For: {data.description}</p>
            </div>
            <div className="sender_details">
              <h4>Bill From:</h4>
              <p>{data.senderAddress.street}</p>
              <p>{data.senderAddress.city}</p>
              <p>{data.senderAddress.postalCode}</p>
              <p>{data.senderAddress.country}</p>
            </div>
          </div>

          {/* =========== details box 2 =========== */}
          <div className="details__box">
            <div>
              <div className="invoice__created-date">
                <p>Invoice Date</p>
                <h4>{data.createdAt}</h4>
              </div>
              <div>
                <p className="invoice__payment">Payment Due</p>
                <h4>{data.paymentDue}</h4>
              </div>
            </div>

            {/* ======= invoice client address ========== */}
            <div className="invoice__client-address">
              <p>Bill to</p>
              <h4>{data.clientName}</h4>
              <div>
                <p>{data.clientAddress.street}</p>
                <p>{data.clientAddress.city}</p>
                <p>{data.clientAddress.postalCode}</p>
                <p>{data.clientAddress.country}</p>
              </div>
            </div>

            <div>
              <p>Send to</p>
              <h4>{data.clientEmail}</h4>
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

              {data.items?.map((item, index) => (
                <li className="list__item" key={index}>
                  <div className="item__name-box">
                    <h5>{item.name}</h5>
                  </div>

                  <div className="list__item-box">
                    <p>{item.quantity}</p>
                  </div>
                  <div className="list__item-box">
                    <p>${item.price}</p>
                  </div>
                  <div className="list__item-box">
                    <h5>${item.total}</h5>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== grand total ============= */}
          <div className="grand__total">
            <h5>Grand Total</h5>
            <h2>${data.total}</h2>
          </div>
        </div>
      </PDFExport>
    </div>
  );
};

export default InvoiceDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  const db = client.db();
  const collection = db.collection("allInvoices");

  const invoices = await collection.find({}, { _id: 1 }).toArray();

  return {
    fallback: "blocking",
    paths: invoices.map((invoice) => ({
      params: {
        invoiceId: invoice._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const { invoiceId } = context.params;

  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  const db = client.db();
  const collection = db.collection("allInvoices");
  const invoice = await collection.findOne({ _id: ObjectId(invoiceId) });

  return {
    props: {
      data: {
        id: invoice._id.toString(),
        senderAddress: invoice.senderAddress,
        clientAddress: invoice.clientAddress,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        description: invoice.description,
        createdAt: invoice.createdAt,
        paymentDue: invoice.paymentDue,
        items: invoice.items,
        total: invoice.total,
        status: invoice.status,
      },
    },
    revalidate: 1,
  };
}
