import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserProfileService, UserProfile, Address, PaymentMethod, EmailPreferences } from '../../../shared/services/user-profile.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  profileForm: FormGroup = this.initProfileForm();
  addressForm: FormGroup = this.initAddressForm();
  paymentForm: FormGroup = this.initPaymentForm();
  activeTab: 'personal' | 'addresses' | 'payments' | 'preferences' = 'personal';
  isEditingAddress = false;
  isEditingPayment = false;
  selectedAddressId: string | null = null;
  selectedPaymentId: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {}

  private initProfileForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      dateOfBirth: ['']
    });
  }

  private initAddressForm(): FormGroup {
    return this.fb.group({
      type: ['home', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      isDefault: [false]
    });
  }

  private initPaymentForm(): FormGroup {
    return this.fb.group({
      type: ['credit', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      isDefault: [false]
    });
  }

  ngOnInit(): void {
    this.userProfileService.getProfile().subscribe(profile => {
      this.profile = profile;
      if (profile) {
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          dateOfBirth: profile.dateOfBirth
        });
      }
    });
  }

  onTabChange(tab: 'personal' | 'addresses' | 'payments' | 'preferences'): void {
    this.activeTab = tab;
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      this.userProfileService.updateProfile(this.profileForm.value);
      this.toastService.show('Profile updated successfully', 'success');
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      if (this.isEditingAddress && this.selectedAddressId) {
        this.userProfileService.updateAddress(this.selectedAddressId, this.addressForm.value);
        this.toastService.show('Address updated successfully', 'success');
      } else {
        this.userProfileService.addAddress(this.addressForm.value);
        this.toastService.show('Address added successfully', 'success');
      }
      this.resetAddressForm();
    }
  }

  onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      const { cardNumber, expiryDate, cvv, ...paymentData } = this.paymentForm.value;
      const lastFourDigits = cardNumber.slice(-4);
      
      if (this.isEditingPayment && this.selectedPaymentId) {
        this.userProfileService.updatePaymentMethod(this.selectedPaymentId, {
          ...paymentData,
          lastFourDigits,
          expiryDate
        });
        this.toastService.show('Payment method updated successfully', 'success');
      } else {
        this.userProfileService.addPaymentMethod({
          ...paymentData,
          lastFourDigits,
          expiryDate
        });
        this.toastService.show('Payment method added successfully', 'success');
      }
      this.resetPaymentForm();
    }
  }

  onEmailPreferencesChange(preferences: Partial<EmailPreferences>): void {
    this.userProfileService.updateEmailPreferences(preferences);
    this.toastService.show('Email preferences updated successfully', 'success');
  }

  editAddress(address: Address): void {
    this.isEditingAddress = true;
    this.selectedAddressId = address.id;
    this.addressForm.patchValue(address);
  }

  deleteAddress(addressId: string): void {
    this.userProfileService.deleteAddress(addressId);
    this.toastService.show('Address deleted successfully', 'success');
  }

  editPaymentMethod(method: PaymentMethod): void {
    this.isEditingPayment = true;
    this.selectedPaymentId = method.id;
    this.paymentForm.patchValue({
      type: method.type,
      isDefault: method.isDefault
    });
  }

  deletePaymentMethod(methodId: string): void {
    this.userProfileService.deletePaymentMethod(methodId);
    this.toastService.show('Payment method deleted successfully', 'success');
  }

  public resetAddressForm(): void {
    this.addressForm.reset({ type: 'home', isDefault: false });
    this.isEditingAddress = false;
    this.selectedAddressId = null;
  }

  public resetPaymentForm(): void {
    this.paymentForm.reset({ type: 'credit', isDefault: false });
    this.isEditingPayment = false;
    this.selectedPaymentId = null;
  }
}
