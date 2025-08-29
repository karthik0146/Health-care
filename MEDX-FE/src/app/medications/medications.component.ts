import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../components/sidebar/home.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface MedicationEntry {
  medicationName: string;
  careUnitName: string;
}

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [HomeComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {

  medicationsArray: MedicationEntry[] = [];
  careUnits: any[] = [];
  medicationForm: FormGroup;
  isMedicationOpen: boolean = false;

  isEditMode: boolean = false;
  editIndex: number | null = null;

  successMsg: string = '';
  errorMsg: string = '';

  constructor(private fb: FormBuilder) {
    this.medicationForm = this.fb.group({
      medicationName: ['', Validators.required],
      careUnitName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const savedMedications = localStorage.getItem('medications');
    if (savedMedications) {
      this.medicationsArray = JSON.parse(savedMedications);
    }
    const savedUnits = localStorage.getItem('careUnits');
    if (savedUnits) {
      this.careUnits = JSON.parse(savedUnits);
      this.medicationsArray = this.medicationsArray.filter(med =>
        this.careUnits.some(unit => unit.careUnitName === med.careUnitName)
      );
      localStorage.setItem('medications', JSON.stringify(this.medicationsArray));
    }
  }

  openMedicationPopup() {
    this.isEditMode = false;
    this.editIndex = null;
    this.isMedicationOpen = true;
    this.medicationForm.reset({ careUnitName: '' });
  }

  closeMedicationPopup() {
    this.isMedicationOpen = false;
  }

  onMedicationSubmit() {
    if (this.medicationForm.valid) {
      if (this.isEditMode && this.editIndex !== null) {
        this.medicationsArray[this.editIndex] = this.medicationForm.value;
        this.showSuccess('✅ Medication updated successfully!');
      } else {
        this.medicationsArray.push(this.medicationForm.value);
        this.showSuccess('✅ Medication added successfully!');
      }

      localStorage.setItem('medications', JSON.stringify(this.medicationsArray));
      this.closeMedicationPopup();
    } else {
      this.showError('⚠️ Please fill in all fields!');
    }
  }

  onEdit(index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    const medicationToEdit = this.medicationsArray[index];

    this.medicationForm.patchValue({
      medicationName: medicationToEdit.medicationName,
      careUnitName: medicationToEdit.careUnitName
    });

    this.isMedicationOpen = true;
  }

  onDelete(medicationToDelete: MedicationEntry) {
    this.medicationsArray = this.medicationsArray.filter(med => med !== medicationToDelete);
    localStorage.setItem('medications', JSON.stringify(this.medicationsArray));
    this.showError('🗑️ Medication deleted successfully!');
  }
  deleteMedicationsByCareUnit(careUnitName: string) {
    const beforeCount = this.medicationsArray.length;
    this.medicationsArray = this.medicationsArray.filter(med => med.careUnitName !== careUnitName);

    if (this.medicationsArray.length !== beforeCount) {
      localStorage.setItem('medications', JSON.stringify(this.medicationsArray));
      this.showError(`🗑️ All medications for Care Unit "${careUnitName}" deleted!`);
    }
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
