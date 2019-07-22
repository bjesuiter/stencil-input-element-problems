import {Component, Event, EventEmitter, h} from '@stencil/core';

@Component({
  tag: 'my-input'
})
export class MyInput {

  private inputElement: HTMLInputElement;

  @Event()
  public valueChange: EventEmitter<number | string>;

  placeholder: 'My Placeholder';
  autofocus: true;
  name: 'my-demo-input-name';

  // noinspection JSUnusedGlobalSymbols
  public componentDidLoad() {
    this.inputElement.name = this.name;
  }

  public componentDidRender() {
    if (this.autofocus) {
      // This does not work :/
      this.inputElement.focus();
    }
  }


  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.validity.valid) {
      this.valueChange.emit(input.value);
      return;
    }
  }


  render() {
    return (
      <input
        // This is stencil magic to get an element from own template
        ref={el => this.inputElement = el as HTMLInputElement}

        // These are normal jsx properties
        type="text"
        class={'my-input'}

        name={this.name}
        // validation properties
        placeholder={(this.placeholder)}
        // Note: This autofocus definition will only trigger once after page reload
        // Add: focus via js in this.componentDidLoad()
        // TODO: focus with JS does not work currently, it may be some shadow dom shenannigans
        autofocus={this.autofocus}

        // react to value changes
        onInput={this.handleInput.bind(this)}
      />
    );
  }

}
