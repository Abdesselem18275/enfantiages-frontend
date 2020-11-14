import { AfterContentInit, ComponentFactoryResolver, ContentChild, Directive, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { ControlErrorMessageComponent } from '../components/control-error-message/control-error-message.component';

@Directive({
  selector: '[appControlValidatorMessage]'
})
export class ControlValidatorMessageDirective implements OnDestroy, AfterContentInit {
  @ContentChild(MatInput,{static: false})
  inputEl :  MatInput;

  @ContentChild(MatError,{read: ViewContainerRef})
  errorMsgContainerEl :  ViewContainerRef ;
  private subscription : Subscription;
  constructor(
    private resolver: ComponentFactoryResolver) {
    }
  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null

  }
  ngAfterContentInit(): void {
    const factory = this.resolver.resolveComponentFactory<ControlErrorMessageComponent>(ControlErrorMessageComponent);
    this.inputEl.ngControl.control.statusChanges.subscribe(x =>
      {
        this.errorMsgContainerEl ? this.errorMsgContainerEl.clear() : null
        if(x === 'INVALID') {
          const compRef = this.errorMsgContainerEl.createComponent(factory)
          compRef.instance.error = this.inputEl.ngControl.control.errors
        } else {
          this.errorMsgContainerEl ? this.errorMsgContainerEl.clear() : null

        }
      })
  }



}
