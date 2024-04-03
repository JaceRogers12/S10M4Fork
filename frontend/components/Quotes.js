import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice'
import {useGetQuotesQuery, useDeleteQuoteMutation, useToggleFakeMutation} from "../state/quotesApi.js";

export default function Quotes() {
  const {data: quotes, isFetching: quotesFetching, error: quotesError} = useGetQuotesQuery();
  const [deleteQuote, {isLoading: deleteLoading, error: deleteError}] = useDeleteQuoteMutation();
  const [toggleFake, {isLoading: fakeLoading, error: fakeError}] = useToggleFakeMutation();
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  return (
    <div id="quotes">
      <h3>Quotes</h3>
      {(quotesFetching || deleteLoading || fakeLoading) && <h4>Updating quotes... </h4>}
      {quotesError && <h4>Error: {quotesError.data.message}</h4>}
      {deleteError && <h4>Error: {deleteError.data.message}</h4>}
      {fakeError && <h4>Error: {fakeError.data.message}</h4>}
      <div>
        {
          quotes?.filter(qt => {
            return displayAllQuotes || !qt.apocryphal
          })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id)}>DELETE</button>
                  <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                  <button onClick={() => {toggleFake({id: qt.id, apocryphal: !qt.apocryphal})}}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
