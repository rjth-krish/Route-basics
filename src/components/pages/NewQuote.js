import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.replace("/quotes"); //push( ) has back option while replace( ) doesnt
    }
  }, [status, history]);

  const addQouteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQouteHandler} />
  );
};

export default NewQuote;
