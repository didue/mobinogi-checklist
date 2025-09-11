import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-auth-pages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-pages.html',
  styleUrl: './auth-pages.scss',
})
export class AuthPages {
  private builder = inject(FormBuilder);

  form = this.builder.nonNullable.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get pwCtrl(): AbstractControl {
    return this.form.controls['password'];
  }
  password = toSignal(
    this.pwCtrl.valueChanges.pipe(startWith(this.pwCtrl.value), debounceTime(150)),
    { initialValue: '' }
  );
  pwLength = computed(() => this.password()?.length ?? 0);
  pwStrength = computed(() => {
    const v = this.password() ?? '';
    let score = 0;
    if (v.length >= 6) score++;
    if (/[^!@#$%^&*]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    return score; // 0~4
  });

  canSubmit = computed(() => this.form.valid && !this.form.pending);

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    console.log('로그인 시도:', this.form.getRawValue());
    // TODO: 실제 로그인 API 호출
  }

  // UX용 에러 헬퍼
  showError(ctrl: AbstractControl, key?: string): boolean {
    if (!ctrl.touched && !ctrl.dirty) return false;
    const errors = ctrl.errors ?? {};
    return key ? !!errors[key] : !!Object.keys(errors).length;
  }
}
