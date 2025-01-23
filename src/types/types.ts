export interface NoteType {
    id: string;
    uid: string;
    title: string;
    tags: string[];
    text: string;
    lastEdited: Date;
    archived: boolean;
}

export interface NotificationType{
    id: string,
    message: string,
    type: "success" | "error" | "info",
}