import * as React from "react";
import "react-dom";
import * as classnames from "classnames";
import { Link } from "react-router";
import { IEntry } from "../../api/Entry";

/* tslint:disable:no-var-requires */
const styles = require("./style.scss");
/* tslint:enable:no-var-requires */

export interface IEntryListItemProps extends React.ClassAttributes<EntryListItem> {
  className?: string;
  entry: IEntry;
}

// TODO: Remove onClick handler, use router Link.

export default class EntryListItem extends React.Component<IEntryListItemProps, {}> {
  /**
   * Render EntryListItem component.
   *
   * @return {JSX.Element} Rendered EntryListItem component.
   */
  public render() {
    const entry = this.props.entry;

    return (
      <li className={classnames(this.props.className, styles.item)}>
        <Link to={`/define/${entry.id}`}>
          {entry.word}
        </Link>
      </li>
    );
  }
}
