import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil
} from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataService } from '@app/service/data.service';
import { ServersDataSource } from '@shared/data-source/servers-data-source';
import { ActivatedRoute } from '@angular/router';

import { ServerSearch } from '@data/interface/server-search';
import { ServerService } from '@data/service/server.service';

import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, AfterViewInit, OnDestroy {
  searchForm: FormGroup;
  serverSearch: ServerSearch;
  searchData$: BehaviorSubject<ServerSearch>;

  serverCount: number;

  /** TABLE COMPONENTS */
  dataSource: ServersDataSource;
  serversTblColumns = [
    'ipv4',
    'domainName',
    'options'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  private signal$ = new Subject();

  constructor(
    private serverService: ServerService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.addFormListeners();
    this.loadInitialData();
  }

  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange
      .pipe(distinctUntilChanged(), takeUntil(this.signal$))
      .subscribe(sort => {
        this.paginator.pageIndex = 0;
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(takeUntil(this.signal$))
      .subscribe(res => this.loadServersPage());
  }

  private loadInitialData() {
    
    this.serverSearch = {
      searchCriterias: this.searchForm.value,
      searchOptions: {
        sortDirection: 'asc',
        sortActive: 'domainName',
        pageIndex: 0,
        pageSize: 5
      }
    };

    this.searchData$ = new BehaviorSubject(this.serverSearch);

    /** Data Source */
    this.dataSource = new ServersDataSource(this.serverService);
    this.dataSource.loadServers(this.searchData$);

    /** Total payments */
    this.serverCount = this.route.snapshot.data['serversCount'];
  }

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      ipv4: '',
      domainName: '',
    });
  }

  private addFormListeners() {
    
    const ipv4$ = this.searchForm
      .get('ipv4')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(450),
        takeUntil(this.signal$),
        map(val => val.toUpperCase())
      );

    ipv4$.subscribe(
      (res: string) => (this.serverSearch.searchCriterias.ipv4 = res)
    );

    const domainName$ = this.searchForm
      .get('domainName')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(450),
        takeUntil(this.signal$),
        map(val => val.toUpperCase())
      );

    domainName$.subscribe(
      (res: string) => (this.serverSearch.searchCriterias.domainName = res)
    );

    merge(
      ipv4$,
      domainName$,
    )
      .pipe(takeUntil(this.signal$))
      .subscribe(res => {
        this.paginator.pageIndex = 0;
        this.loadServersPage();
      });
  }

  private loadServersPage() {
    this.serverSearch.searchOptions = {
      sortDirection: this.sort.direction,
      sortActive: this.sort.active,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.searchData$.next(this.serverSearch);
  }

  ngOnDestroy() {
    this.signal$.next('');
    this.signal$.complete();

    this.searchData$.complete();
  }
}
