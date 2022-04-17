import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'status'})
export class StatusPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    if(value=="Order received"){return '<span style="color:purple">Order received</span>'}
    else if(value=="Preparing to wash"){return '<span style="color:orange">Preparing to wash</span>'}
    else if(value=="Preparing to iron"){return '<span style="color:orange">Preparing to iron</span>'}
    else if(value=="Washing"){return '<span style="color:yellow">Washing</span>'}
    else if(value=="Drying"){return '<span style="color:lightblue">Drying</span>'}
    else if(value=="Ironing"){return '<span style="color:darkblue">Ironing</span>'}
    else if(value=="Ready to pick up"){return '<span style="color:green">Ready to pick up</span>'}
    else{
      return
    }
  
  
  }
}