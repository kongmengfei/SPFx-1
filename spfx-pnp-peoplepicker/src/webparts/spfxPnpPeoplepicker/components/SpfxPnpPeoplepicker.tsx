import * as React from 'react';
import styles from './SpfxPnpPeoplepicker.module.scss';
import { ISpfxPnpPeoplepickerProps } from './ISpfxPnpPeoplepickerProps';
import { ISpfxPnpPeoplepickerState, IUserDetail } from './ISpfxPnpPeoplepickerState';
import { sp } from "@pnp/sp";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export default class SpfxPnpPeoplepicker extends React.Component<ISpfxPnpPeoplepickerProps, ISpfxPnpPeoplepickerState> {
  constructor(props: ISpfxPnpPeoplepickerProps, state: ISpfxPnpPeoplepickerState) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = { SuccessMessage: '', UserDetails: [], selectedusers: [] };
    this._getListItem();
  }

  @autobind
  private async _getListItem() {
    const item: any = await sp.web.lists.getByTitle("kkkk").items.getById(7).select("Title", "Customer/Name").expand("Customer").get();
    
    console.log(item);

    let usernamearr: string[] = [];
    item.Customer.forEach(user => {
      usernamearr.push(user.Name.split('|membership|')[1].toString());
    });

    console.log(usernamearr);

    this.setState({
      selectedusers: usernamearr
    });
  }

  public render(): React.ReactElement<ISpfxPnpPeoplepickerProps> {
    return (
      <div className={styles.spfxPnpPeoplepicker}>
        <PeoplePicker
          context={this.props.context}
          titleText="People Picker"
          personSelectionLimit={3}
          showtooltip={true}
          isRequired={true}
          selectedItems={this._getPeoplePickerItems}
          showHiddenInUI={false}
          principalTypes={[PrincipalType.User]}
          defaultSelectedUsers={this.state.selectedusers}
          resolveDelay={1000} />
        <br></br>
        <button className={styles.button} onClick={this._updateListItem}>Save</button>
        <br></br>
        <br></br>
        <label className={styles.label}>{this.state.SuccessMessage}</label>
      </div>
    );
  }

  @autobind
  private _getPeoplePickerItems(items: any[]) {
    let userarr: IUserDetail[] = [];
    items.forEach(user => {
      userarr.push({ ID: user.id, LoginName: user.loginName });
    });

    console.log(userarr);

    this.setState({ UserDetails: userarr });
  }

  @autobind
  private async _updateListItem() {
    let userids: object[] = [];
    this.state.UserDetails.forEach(user => {
      userids.push({ key: user.LoginName });
    });

    const updatedItem = await sp.web.lists.getByTitle("kkkk").items.getById(1).validateUpdateListItem(
      [{
        FieldName: "Customer",
        FieldValue: JSON.stringify(userids),
      }]);

    this.setState({ SuccessMessage: 'Successfully saved' });

  }
}
