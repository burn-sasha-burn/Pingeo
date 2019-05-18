import cn from 'classnames';

export function injectExternalStyles(
    componentStyles: ITypedObject<string>,
    externalStyles: ITypedObject<string>,
): void {
    Object.keys(externalStyles).forEach((key) => {
        componentStyles[key] = cn(componentStyles[key], externalStyles[key]);
    });
}
