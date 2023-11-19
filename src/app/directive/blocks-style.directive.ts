// @ts-ignore

import {Directive, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, OnInit,SimpleChanges, OnDestroy} from '@angular/core';


@Directive({
  selector: '[appBlocksStyle]',
  host: {'(document: keyup)': 'initKeyUp($event)'},
  exportAs: "blockStyle"
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() selector: string;
  @Input() initFirst: boolean = false;
  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number = 0;
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst) {
        if (this.items[0]) {
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    } else {
      console.log('Не передан селектор')
    }
    setTimeout(() => {this.renderComplete.emit(true)}, 0)
  };
  ngOnChanges(data: SimpleChanges): void {}

  initKeyUp(ev: KeyboardEvent): void {
    if(ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

    if (ev.key === 'ArrowRight') {
      if (this.index !== this.items.length -1) {
        this.index++;
      }
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        console.log(ev)
      }
    } else if (ev.key === 'ArrowLeft') {
      this.index--;
      if (this.items[this.index]) {
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
      }
    }
    this.activeElementIndex = this.index;
  }
  initStyle(index: number): void {
    if (this.items[index]) {
      (this.items[index] as HTMLElement).setAttribute('style','border: 2px solid red' )
    }
  };
}



