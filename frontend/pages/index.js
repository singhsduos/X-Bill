import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const navigatePage = () => router.push("/addnew");

  return (
    <>
      <Head>
        <title>X Bill</title>
      </Head>
      <div className="main__container">
        <div className="invoice__header">
          <div className="invoice__header-logo">
            <h3>Invoices</h3>
            <p>There are total 8 invoices</p>
          </div>

          <button className="btn" onClick={navigatePage}>
            Add New
          </button>
        </div>

        <div className="invoice_container">
          {/* ======= invoice item =========== */}
          <Link href={`/invoices/12`} passRef key={12}>
            <div className="invoice__item">
              <div>
                <h5 className="invoice__id">RT59K0</h5>
              </div>

              <div>
                <h6 className="invoice__client">Ramesh</h6>
              </div>

              <div>
                <p className="invoice__created">27/10/2021</p>
              </div>

              <div>
                <h3 className="invoice__total">$4556.2</h3>
              </div>

              <div>
                <button className="pending__status">Pending</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
