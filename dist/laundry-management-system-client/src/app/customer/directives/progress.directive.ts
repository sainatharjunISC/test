import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector : '[status]'
})
export class ProgressDirective{
    @Input() status:any;
    constructor(private elm:ElementRef){
      
    }
    ngOnInit(){
      
    }
}












  // <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Washing</div>
  // <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Ready to pick up</div>