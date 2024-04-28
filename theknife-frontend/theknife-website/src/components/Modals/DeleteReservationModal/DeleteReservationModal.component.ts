import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-DeleteReservationModal',
  templateUrl: './DeleteReservationModal.component.html',
  styleUrls: ['./DeleteReservationModal.component.css'],
})
export class DeleteReservationModalComponent {
  @Input() reservation: any;

  constructor(public activeModal: NgbActiveModal) {}
}
