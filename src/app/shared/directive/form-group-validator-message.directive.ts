import { ComponentFactoryResolver } from '@angular/core';
import { AfterContentInit, ContentChild, Directive, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ControlErrorMessageComponent } from '../components/control-error-message/control-error-message.component';

@Directive({
  selector: '[appFormGroupValidatorMessage]'
})
export class FormGroupValidatorMessageDirective implements OnDestroy, AfterContentInit{
  @ContentChild(MatError,{read: ViewContainerRef})
  errorMsgContainerEl :  ViewContainerRef ;
  private subscription : Subscription;
  @ContentChild(FormGroupDirective,{static: false})
  formGroup :  FormGroupDirective
  ;
  constructor(
    private resolver: ComponentFactoryResolver) {
  }
  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null
  }
  ngAfterContentInit(): void {
    const factory = this.resolver.resolveComponentFactory<ControlErrorMessageComponent>(ControlErrorMessageComponent);
    this.subscription  =this.formGroup && this.formGroup.statusChanges.subscribe(x =>
      {
        this.errorMsgContainerEl.clear()
        if(x === 'INVALID') {
          const compRef = this.errorMsgContainerEl.createComponent(factory)
          compRef.instance.error = this.formGroup.errors
        } else {
          this.errorMsgContainerEl.clear()
        }
      })
  }

}
