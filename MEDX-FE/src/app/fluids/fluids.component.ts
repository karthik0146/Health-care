import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../components/sidebar/home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface FluidEntry {
  fluidName: string;
  careUnitName: string;
}

@Component({
  selector: 'app-fluids',
  standalone: true,
  imports: [HomeComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './fluids.component.html',
  styleUrls: ['./fluids.component.css']
})
export class FluidsComponent implements OnInit {

  fluidsArray: FluidEntry[] = [];
  careUnits: any[] = [];
  fluidForm: FormGroup;
  isFluidOpen = false;

  isEditMode = false;
  editIndex: number | null = null;

  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder) {
    this.fluidForm = this.fb.group({
      fluidName: ['', Validators.required],
      careUnitName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const savedFluids = localStorage.getItem('fluids');
    if (savedFluids) {
      this.fluidsArray = JSON.parse(savedFluids);
    }

    const savedUnits = localStorage.getItem('careUnits');
    if (savedUnits) {
      this.careUnits = JSON.parse(savedUnits);
    }
  }

  openFluidPopup() {
    this.isEditMode = false;
    this.editIndex = null;
    this.isFluidOpen = true;
    this.fluidForm.reset({ careUnitName: '' });
  }

  closeFluidPopup() {
    this.isFluidOpen = false;
  }

  onFluidSubmit() {
    if (this.fluidForm.valid) {
      if (this.isEditMode && this.editIndex !== null) {
        this.fluidsArray[this.editIndex] = this.fluidForm.value;
        this.showSuccess('✅ Fluid updated successfully!');
      } else {
        this.fluidsArray.push(this.fluidForm.value);
        this.showSuccess('✅ Fluid added successfully!');
      }
      localStorage.setItem('fluids', JSON.stringify(this.fluidsArray));
      this.closeFluidPopup();
    } else {
      this.showError('⚠️ Please fill in all fields!');
    }
  }

  onEdit(index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    const fluid = this.fluidsArray[index];
    this.fluidForm.patchValue(fluid);
    this.isFluidOpen = true;
  }

  onDelete(entry: FluidEntry) {
    this.fluidsArray = this.fluidsArray.filter(f => f !== entry);
    localStorage.setItem('fluids', JSON.stringify(this.fluidsArray));
    this.showError('🗑️ Fluid deleted successfully!');
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    setTimeout(() => this.successMsg = '', 3000);
  }

  showError(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => this.errorMsg = '', 3000);
  }
}
