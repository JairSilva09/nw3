import { Component, Input } from '@angular/core';
import { Nw3Component } from 'src/app/nw3/nw3.component';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent extends Nw3Component{
  @Input() qrCode: any
  @Input() diplayQr: any
}
