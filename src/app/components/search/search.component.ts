import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs'
import { Quotes } from './../../models/quotes'
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators'
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public quotes?:Observable<Quotes[]>
  private subjectSearch: Subject<string> = new Subject<string>()
  
  constructor(
    private quoteService: QuoteService
  ) { }

  ngOnInit(): void {
  }
  executeSearch(termSearched:string){
    this.quotes = this.subjectSearch.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap( _ => {
        if (termSearched.trim() === '') {
          //retornar um observable de array de ofertas vazio caso preencha um campo vazio na pesquisa
          return of<Quotes[]>([])
        }
        return this.quoteService.searchQuotes(termSearched);
      }),
      catchError((err: any) => {
        console.log(err)
        return of<Quotes[]>([])
      })
    )
  }
  search(search:string){
    this.subjectSearch.next(search)
  }
  clearSearch(): void {
    this.subjectSearch.next('')
  }

}
