import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-group-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-group-dialog.component.html',
  styleUrls: ['./new-group-dialog.component.scss']
})
export class NewGroupDialogComponent {
  groupName: string = '';

  constructor(private readonly dialogRef: MatDialogRef<NewGroupDialogComponent>) { }

  confirm() {
    if (this.groupName.trim()) {
      this.dialogRef.close(this.groupName.trim());
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}