export interface IAreaData {
    code: string;
    name: string;
}

export interface IAreaItem extends IAreaData {
    children?: IAreaItem[];
}

export interface IResData {
    province: IAreaData,
    city: IAreaData,
    area: IAreaData,
}
