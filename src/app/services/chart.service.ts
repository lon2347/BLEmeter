import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chartInstance: Chart | null = null; // Store the chart instance
  constructor() { }

  // Method to create a single chart with multiple lines
  single(datasets: { key: string; data: any[]; backgroundColor?: string; borderColor?: string }[], labels: any, context: string, chartType: any): Chart {
    // Destroy the existing chart if it exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Create a new chart instance
    this.chartInstance = new Chart(context, {
      type: chartType,
      data: {
        labels: labels,
        datasets: datasets.map(dataset => ({
          label: dataset.key,
          data: dataset.data,
          backgroundColor: dataset.backgroundColor,
          borderColor: dataset.borderColor,
          fill: false,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }))
      }
    });

    // Return the created chart instance
    return this.chartInstance;
  }

  // Method to destroy the chart
  destroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null; // Clear the reference
    }
  }
}
