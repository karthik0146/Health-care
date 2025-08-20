import { Component } from '@angular/core';
import { HomeComponent } from '../sidebar/home.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CareUnit {
  name: string;
  type: string;
}

@Component({
  selector: 'app-careunit',
  imports: [HomeComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './careunit.component.html',
  styleUrl: './careunit.component.css'
})
export class CareunitComponent {
  careunitsArray: CareUnit[] = [];
  careUnitForm: FormGroup;
  isopen: boolean = false;
  isEditMode: boolean = false;
  editIndex: number | null = null;

  // 🔔 Message variables
  successMsg: string = '';
  errorMsg: string = '';

  constructor(private fb: FormBuilder) {
    this.careUnitForm = this.fb.group({
      careUnitName: ['', Validators.required],
      careUnitType: ['', Validators.required]
    });
  }

  ngOnInit() {
    const savedUnits = localStorage.getItem('careUnits');
    if (savedUnits) {
      this.careunitsArray = JSON.parse(savedUnits);
    }
  }

  openPopup() {
    this.isopen = true;
    this.isEditMode = false;
    this.editIndex = null;
    this.careUnitForm.reset();
  }

  onSubmit() {
    if (this.careUnitForm.valid) {
      const newUnit: CareUnit = {
        name: this.careUnitForm.value.careUnitName,
        type: this.careUnitForm.value.careUnitType
      };

      if (this.isEditMode && this.editIndex !== null) {
        this.careunitsArray[this.editIndex] = newUnit;
        this.showSuccess("✅ Care Unit updated successfully!");
      } else {
        this.careunitsArray.push(newUnit);
        this.showSuccess("✅ Care Unit added successfully!");
      }

      localStorage.setItem('careUnits', JSON.stringify(this.careunitsArray));
      this.isopen = false;
      this.isEditMode = false;
      this.editIndex = null;
    } else {
      this.showError("⚠️ Please fill in all required fields!");
    }
  }

  onDelete(unit: CareUnit) {
    this.careunitsArray = this.careunitsArray.filter(u => u !== unit);
    localStorage.setItem('careUnits', JSON.stringify(this.careunitsArray));
    this.showError("🗑️ Care Unit deleted successfully!");
  }

  closePopup() {
    this.isopen = false;
    this.isEditMode = false;
    this.editIndex = null;
  }

  onEdit(index: number) {
    this.isopen = true;
    this.isEditMode = true;
    this.editIndex = index;
    const unit = this.careunitsArray[index];
    this.careUnitForm.patchValue({
      careUnitName: unit.name,
      careUnitType: unit.type
    });
  }

  // 🔔 Show success popup
  showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000); // auto-hide after 3s
  }

  // 🔔 Show error popup
  showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 3000);
  }
}
