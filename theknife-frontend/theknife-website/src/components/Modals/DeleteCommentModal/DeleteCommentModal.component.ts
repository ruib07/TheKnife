import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-DeleteCommentModal',
  templateUrl: './DeleteCommentModal.component.html',
  styleUrls: ['./DeleteCommentModal.component.css'],
})
export class DeleteCommentModalComponent {
  @Input() comment: any;

  constructor(public activeModal: NgbActiveModal) {}
}
