import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Subject, map,  debounceTime, distinctUntilChanged, switchMap, Observable} from 'rxjs';
import {ajax} from 'rxjs/ajax'
import { IGitHubSearchResult } from './types';

const url = 'https://api.github.com/search/users?per_page=100&q='
 

const App  = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const subject$ = new Subject<any>()
  const [avatars, setAvatars] = useState<string[]>([])
  
  subject$
  .pipe(
    debounceTime(500),
    map((e: InputEvent) => (e.target as HTMLInputElement).value.trim()),
    distinctUntilChanged(),
    switchMap((v: string): Observable<IGitHubSearchResult> => ajax.getJSON(url + v)),
    map(result => result.items.map(item => item.avatar_url)),
  )
  .subscribe(setAvatars)

  
  useEffect(() => {
    return () => subject$.unsubscribe()
  }, [])  


  return <div className='App'>
          <div className='controls'>
            <input onChange={e => subject$.next(e)}/>
          </div>
          <div ref={containerRef} className='container'>
              {avatars.map(avatar => <img src={avatar} key={avatar}/>)}
          </div>
        </div>
}

export default App;
