import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface ISpfxPnpPeoplepickerWebPartProps {
    description: string;
}
export default class SpfxPnpPeoplepickerWebPart extends BaseClientSideWebPart<ISpfxPnpPeoplepickerWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=SpfxPnpPeoplepickerWebPart.d.ts.map