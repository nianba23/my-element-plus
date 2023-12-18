export interface IListItem {
    avatar?: string;
    title?: string;
    desc?: string;
    time?: string;
    tag?: string;
    tagType?: 'success' | 'info' | 'warning' | 'danger' | '';
}

export interface IListOptions {
    title: string;
    content: IListItem[];
}

export interface IListActions {
    text: string;
    icon?: string;
}
