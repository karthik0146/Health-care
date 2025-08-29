import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/sidebar/home.component';

@Component({
  selector: 'app-hospital',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  // Core state
  droppedImage: string | null = null;
  isDragOver = false;

  constructor() {}

  ngOnInit() {
    // Component initialized
  }

  // Drag and drop methods
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.handleFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  // Browse button functionality
  onBrowseClick(): void {
    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    // Add event listener for file selection
    fileInput.addEventListener('change', (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.handleFile(file);
      }
      // Clean up the file input
      document.body.removeChild(fileInput);
    });
    
    // Add to DOM and trigger click
    document.body.appendChild(fileInput);
    fileInput.click();
  }

  private handleFile(file: File): void {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, WebP, etc.)');
      return;
    }
    
    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('File size too large. Please select an image under 15MB.');
      return;
    }

    // Create object URL for display
    this.droppedImage = URL.createObjectURL(file);
    console.log('✅ File loaded:', file.name, file.type, file.size);
  }

  // Remove image
  removeImage() {
    if (this.droppedImage) {
      URL.revokeObjectURL(this.droppedImage);
      this.droppedImage = null;
    }
  }
}