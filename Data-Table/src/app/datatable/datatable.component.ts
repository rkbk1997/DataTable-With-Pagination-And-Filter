import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  displayedColumns: string[] = ['App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres'];
  // ,'Last Updated','Current Ver','Android Ver'
  ELEMENT_DATA;
  dataSource;
  @ViewChild(MatSort,{ static: true }) sort: MatSort;
  @ViewChild(MatPaginator,{ static: true }) paginator: MatPaginator;

  constructor(private api: ApiService) {}
  
  async loadData() {
    await this.api.getApiData().subscribe(res=>{
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.loadData()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
