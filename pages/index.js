import Link from "next/link";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

export default function Home(props) {
  const router = useRouter();
  const { data } = props;

  const navigatePage = () => router.push("/addnew");

  return (
    <div className="main__container">
      <div className="invoice__header">
        <div className="invoice__header-logo">
          <h3>Invoices</h3>
          <p>There are total {data.length} invoices</p>
        </div>

        <button className="btn" onClick={navigatePage}>
          Add New
        </button>
      </div>

      <div className="invoice__container">
        {/* ======= invoice item =========== */}
        {data?.map((invoice) => (
          <Link href={`/invoices/${invoice.id}`} passRef key={invoice.id}>
            <div className="invoice__item">
              <div>
                <h5 className="invoice__id">
                  #{invoice.id.substr(0, 6).toUpperCase()}
                  {invoice.id.substr(22, 24).toUpperCase()}
                </h5>
              </div>

              <div>
                <h6 className="invoice__client">{invoice.clientName}</h6>
              </div>

              <div>
                <p className="invoice__created">{invoice.createdAt}</p>
              </div>

              <div>
                <h3 className="invoice__total">${invoice.total}</h3>
              </div>

              <div>
                <button
                  className={`indexBtns ${
                    invoice.status === "paid"
                      ? "paid__status"
                      : invoice.status === "pending"
                      ? "pending__status"
                      : "draft__status"
                  }`}
                >
                  {invoice.status}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
  });

  const db = client.db();
  const collection = db.collection("allInvoices");
  const sort = {
    total: -1,
  };
  const invoices = await collection.find({}).sort(sort).toArray();

  return {
    props: {
      data: invoices.map((invoice) => {
        return {
          id: invoice._id.toString(),
          clientName: invoice.clientName,
          createdAt: invoice.createdAt,
          total: invoice.total,
          status: invoice.status,
        };
      }),
    },
    revalidate: 1,
  };
}
