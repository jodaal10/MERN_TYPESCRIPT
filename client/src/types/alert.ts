export interface Alert {
    id: string;
    message: string;
    alertType: string;
  }

export enum alertActionTypes {
    SET_ALERT = "SET_ALERT",
    REMOVE_ALERT = "REMOVE_ALERT",
}

export interface alertState {
    readonly data: Alert[];
}
  