export interface IMenuItem {
    icon?: string;
    name: string;
    index: string;
    children?: IMenuItem[];
    [key: string]: any;
}
