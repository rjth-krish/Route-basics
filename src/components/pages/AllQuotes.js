import { useEffect } from "react";

import Quotelist from "../quotes/QuoteList";
import LoadingSpinner from "../UI/LoadingSpinner";
import NoQuotesFound from "../quotes/NoQuotesFound";
import useHttp from "../../hooks/use-http";
import { getAllQuotes } from "../../lib/api";

// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "Antonin Artaud",
//     text: "Everything is going badly because at this moment the morbid conscience has an essential interest in not recovering from its own sickness",
//   },
//   {
//     id: "q2",
//     author: "Rjth",
//     text: "Why is it a practice...So common nd well known, That u seek other hearts to discover your own",
//   },
// ];

const AllQuote = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <Quotelist quotes={loadedQuotes} />;
};

export default AllQuote;
