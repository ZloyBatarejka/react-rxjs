import React, { useEffect } from 'react';
import './App.css';
import { interval, map, scan } from 'rxjs';
import { TICKER_INTERVAL } from './const';


const App  = () => {
  const ticker$ = interval(TICKER_INTERVAL)
  .pipe(
    map((): any => ({
      time: Date.now(),
      deltaTime: null
    })),
    scan((prev, cur): any => ({
      time: cur.time,
      deltaTime: cur.time - prev.time
    }))
  )

  useEffect(() => {
    const tickerSub = ticker$.subscribe(console.log)

    return tickerSub.unsubscribe()
  }, [])
  
  return <div className='App'>hello</div>
}

export default App;
