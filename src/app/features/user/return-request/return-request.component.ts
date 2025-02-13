import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { OrderService, Order, OrderItem } from '../../../shared/services/order.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-return-request',
  templateUrl: './return-request.component.html',
  styleUrls: ['./return-request.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ReturnRequestComponent implements OnInit {
  order: Order | undefined;
  returnForm: FormGroup;
  returnReasons = [
    'Wrong size',
    'Wrong color',
    'Damaged/Defective',
    'Not as described',
    'Changed mind',
    'Other'
  ];
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private toastService: ToastService
  ) {
    this.returnForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(order => {
        if (order && this.canRequestReturn(order)) {
          this.order = order;
          this.initializeForm();
        } else {
          this.toastService.show('This order is not eligible for return', 'error');
          this.router.navigate(['/user/orders']);
        }
      });
    }
  }

  private initializeForm(): void {
    const itemsFormArray = this.returnForm.get('items') as FormArray;
    this.order?.items.forEach(item => {
      itemsFormArray.push(this.createItemFormGroup(item));
    });
  }

  private createItemFormGroup(item: OrderItem): FormGroup {
    return this.fb.group({
      orderItemId: [item.id],
      name: [{ value: item.name, disabled: true }],
      quantity: [0, [Validators.min(0), Validators.max(item.quantity)]],
      maxQuantity: [item.quantity],
      reason: ['', Validators.required],
      details: ['']
    });
  }

  get itemForms(): FormArray {
    return this.returnForm.get('items') as FormArray;
  }

  getOrderItem(index: number): OrderItem | undefined {
    return this.order?.items[index];
  }

  getQuantity(index: number): number {
    return this.itemForms.at(index).get('quantity')?.value || 0;
  }

  getMaxQuantity(index: number): number {
    return this.itemForms.at(index).get('maxQuantity')?.value || 0;
  }

  getReason(index: number): string {
    return this.itemForms.at(index).get('reason')?.value || '';
  }

  decrementQuantity(index: number): void {
    const control = this.itemForms.at(index).get('quantity');
    if (control) {
      control.setValue(Math.max(0, control.value - 1));
    }
  }

  incrementQuantity(index: number): void {
    const control = this.itemForms.at(index).get('quantity');
    const maxQuantity = this.getMaxQuantity(index);
    if (control) {
      control.setValue(Math.min(maxQuantity, control.value + 1));
    }
  }

  getReturnItemCount(): number {
    return this.itemForms.controls.reduce((count, control) => {
      return count + (control.get('quantity')?.value > 0 ? 1 : 0);
    }, 0);
  }

  isFormValid(): boolean {
    return this.returnForm.valid && this.getReturnItemCount() > 0;
  }

  canRequestReturn(order: Order): boolean {
    return (
      order.status === 'delivered' &&
      !order.returnRequest &&
      new Date().getTime() - new Date(order.deliveredDate!).getTime() <= 30 * 24 * 60 * 60 * 1000 // 30 days
    );
  }

  isItemFormValid(index: number): boolean {
    const itemForm = this.itemForms.at(index);
    return itemForm.get('quantity')?.value > 0 && itemForm.valid;
  }

  calculateRefundAmount(): number {
    return this.itemForms.controls.reduce((total, control, index) => {
      const item = this.getOrderItem(index);
      const quantity = control.get('quantity')?.value || 0;
      return total + (item?.price || 0) * quantity;
    }, 0);
  }

  onSubmit(): void {
    if (this.returnForm.valid && this.order) {
      const returnItems = this.itemForms.controls
        .map((control, index) => ({
          orderItemId: control.get('orderItemId')?.value,
          quantity: control.get('quantity')?.value,
          reason: control.get('reason')?.value + 
                 (control.get('details')?.value ? `: ${control.get('details')?.value}` : '')
        }))
        .filter(item => item.quantity > 0);

      if (returnItems.length === 0) {
        this.toastService.show('Please select at least one item to return', 'error');
        return;
      }

      const returnRequestId = this.orderService.createReturnRequest({
        orderId: this.order.id,
        items: returnItems
      });

      this.toastService.show('Return request submitted successfully', 'success');
      this.router.navigate(['/user/orders']);
    }
  }
}
