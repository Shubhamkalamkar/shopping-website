import { Component } from '@angular/core';
@Component({
  selector: 'loader-spinner',
  standalone: true,
  template: `<div class="loader">
    <span class="spinner spinner1"></span>
    <span class="spinner spinner2"></span>
    <span class="spinner spinner3"></span>
    <br />
    <span class="loader-text">LOADING...</span>
  </div>`,
  styles: ` .loader{
    position: fixed;
    z-index: 301;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 200px;
    overflow: hidden;
    text-align: center;
  }

  .spinner{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 303;
    border-radius: 100%;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
  }

  .spinner1{
    width: 100px;
    height: 100px;
    border: 10px solid var(--primary-color);
    animation: spin 1s linear infinite;
  }

  .spinner2{
    width: 70px;
    height: 70px;
    border: 10px solid var(--primary-color);
    animation: negative-spin 2s linear infinite;
  }

  .spinner3{
    width: 40px;
    height: 40px;
    border: 10px solid var(--primary-color);
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    0%{
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100%{
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }

  @keyframes negative-spin {
    0%{
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100%{
      transform: translate(-50%,-50%) rotate(-360deg);
    }
  }

  .loader-text {
    position: relative;
    top: 75%;
    color: var(--primary-color);
    font-weight: bold;
  }`,
})
export class LoadingComponent {}
