import * as React from "react";
import LoadingIndicator from "./LoadingIndicator";
import "react-dom";

/* tslint:disable:no-var-requires */
const styles = require("./SearchInput.style.scss");
/* tslint:enable:no-var-requires */

export interface ISearchInputProps extends React.ClassAttributes<SearchInput> {
  className?: string;
  isLoading?: boolean;
  placeholder?: string;
  text?: string;
  onChange?(event: React.FormEvent): void;
  onSubmit?(prefix: String): void;
}

export default class SearchInput extends React.Component<ISearchInputProps, {}> {
  /**
   * Render application container.
   *
   * @return {JSX.Element} Rendered application container.
   */
  public render() {
    return (
      <div className={this.props.className}>
        <input
          type="search"
          className={styles.input}
          value={this.props.text}
          onChange={this.props.onChange}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              this.props.onSubmit(this.props.text);
            }
          }}
          placeholder={this.props.placeholder}
        />
        {this.props.isLoading ? (
          <div className={styles.loaderContainer}>
            <LoadingIndicator className={styles.loader} />
          </div>
        ) : ""}
      </div>
    );
  }
}